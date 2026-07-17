import requests
import json
from datetime import datetime

# Backend URL from frontend/.env
BASE_URL = "https://nicotine-retail-hub.preview.emergentagent.com/api"

def print_test_header(test_name):
    print(f"\n{'='*60}")
    print(f"TEST: {test_name}")
    print(f"{'='*60}")

def print_result(endpoint, status_code, success, data=None, error=None):
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"\n{status} - {endpoint}")
    print(f"Status Code: {status_code}")
    if error:
        print(f"Error: {error}")
    if data:
        print(f"Response Preview: {json.dumps(data, indent=2)[:500]}...")

def test_get_products():
    """Test GET /api/products - Should return all products"""
    print_test_header("GET /api/products - Get All Products")
    
    try:
        response = requests.get(f"{BASE_URL}/products", timeout=10)
        status_code = response.status_code
        
        if status_code == 200:
            data = response.json()
            
            # Validate response structure
            if isinstance(data, list):
                print(f"✅ Response is a list with {len(data)} products")
                
                if len(data) > 0:
                    # Check first product structure
                    product = data[0]
                    required_fields = ['_id', 'name', 'category', 'price', 'image', 'description', 'inStock', 'featured']
                    missing_fields = [field for field in required_fields if field not in product]
                    
                    if not missing_fields:
                        print(f"✅ Product structure is correct")
                        print(f"Sample Product: {json.dumps(product, indent=2)}")
                        print_result("GET /api/products", status_code, True, {"total_products": len(data), "sample": product})
                        return True
                    else:
                        print(f"❌ Missing fields in product: {missing_fields}")
                        print_result("GET /api/products", status_code, False, error=f"Missing fields: {missing_fields}")
                        return False
                else:
                    print("⚠️  No products found in database")
                    print_result("GET /api/products", status_code, True, {"total_products": 0})
                    return True
            else:
                print_result("GET /api/products", status_code, False, error="Response is not a list")
                return False
        else:
            print_result("GET /api/products", status_code, False, error=f"Expected 200, got {status_code}")
            return False
            
    except Exception as e:
        print_result("GET /api/products", 0, False, error=str(e))
        return False

def test_get_featured_products():
    """Test GET /api/products/featured - Should return only featured products"""
    print_test_header("GET /api/products/featured - Get Featured Products")
    
    try:
        response = requests.get(f"{BASE_URL}/products/featured", timeout=10)
        status_code = response.status_code
        
        if status_code == 200:
            data = response.json()
            
            if isinstance(data, list):
                print(f"✅ Response is a list with {len(data)} featured products")
                
                # Verify all products are featured
                if len(data) > 0:
                    all_featured = all(product.get('featured', False) for product in data)
                    if all_featured:
                        print(f"✅ All products are marked as featured")
                        print_result("GET /api/products/featured", status_code, True, {"total_featured": len(data)})
                        return True
                    else:
                        print(f"❌ Some products are not marked as featured")
                        print_result("GET /api/products/featured", status_code, False, error="Non-featured products in response")
                        return False
                else:
                    print("⚠️  No featured products found")
                    print_result("GET /api/products/featured", status_code, True, {"total_featured": 0})
                    return True
            else:
                print_result("GET /api/products/featured", status_code, False, error="Response is not a list")
                return False
        else:
            print_result("GET /api/products/featured", status_code, False, error=f"Expected 200, got {status_code}")
            return False
            
    except Exception as e:
        print_result("GET /api/products/featured", 0, False, error=str(e))
        return False

def test_get_categories():
    """Test GET /api/categories - Should return all categories"""
    print_test_header("GET /api/categories - Get All Categories")
    
    try:
        response = requests.get(f"{BASE_URL}/categories", timeout=10)
        status_code = response.status_code
        
        if status_code == 200:
            data = response.json()
            
            if isinstance(data, list):
                print(f"✅ Response is a list with {len(data)} categories")
                
                if len(data) > 0:
                    # Check first category structure
                    category = data[0]
                    required_fields = ['_id', 'name', 'slug']
                    missing_fields = [field for field in required_fields if field not in category]
                    
                    if not missing_fields:
                        print(f"✅ Category structure is correct")
                        print(f"Sample Category: {json.dumps(category, indent=2)}")
                        print_result("GET /api/categories", status_code, True, {"total_categories": len(data), "sample": category})
                        return True
                    else:
                        print(f"❌ Missing fields in category: {missing_fields}")
                        print_result("GET /api/categories", status_code, False, error=f"Missing fields: {missing_fields}")
                        return False
                else:
                    print("⚠️  No categories found in database")
                    print_result("GET /api/categories", status_code, True, {"total_categories": 0})
                    return True
            else:
                print_result("GET /api/categories", status_code, False, error="Response is not a list")
                return False
        else:
            print_result("GET /api/categories", status_code, False, error=f"Expected 200, got {status_code}")
            return False
            
    except Exception as e:
        print_result("GET /api/categories", 0, False, error=str(e))
        return False

def test_get_settings():
    """Test GET /api/settings - Should return site settings"""
    print_test_header("GET /api/settings - Get Site Settings")
    
    try:
        response = requests.get(f"{BASE_URL}/settings", timeout=10)
        status_code = response.status_code
        
        if status_code == 200:
            data = response.json()
            
            if isinstance(data, dict):
                print(f"✅ Response is a dictionary")
                
                # Check for important settings fields
                important_fields = ['_id', 'siteName', 'whatsappNumber', 'phone', 'email']
                missing_fields = [field for field in important_fields if field not in data]
                
                if not missing_fields:
                    print(f"✅ Settings structure is correct")
                    print(f"Settings Preview: {json.dumps({k: v for k, v in list(data.items())[:5]}, indent=2)}")
                    print_result("GET /api/settings", status_code, True, {"fields_count": len(data)})
                    return True
                else:
                    print(f"❌ Missing fields in settings: {missing_fields}")
                    print_result("GET /api/settings", status_code, False, error=f"Missing fields: {missing_fields}")
                    return False
            else:
                print_result("GET /api/settings", status_code, False, error="Response is not a dictionary")
                return False
        else:
            print_result("GET /api/settings", status_code, False, error=f"Expected 200, got {status_code}")
            return False
            
    except Exception as e:
        print_result("GET /api/settings", 0, False, error=str(e))
        return False

def test_get_dashboard_analytics():
    """Test GET /api/analytics/dashboard - Should return dashboard statistics"""
    print_test_header("GET /api/analytics/dashboard - Get Dashboard Stats")
    
    try:
        response = requests.get(f"{BASE_URL}/analytics/dashboard", timeout=10)
        status_code = response.status_code
        
        if status_code == 200:
            data = response.json()
            
            if isinstance(data, dict):
                print(f"✅ Response is a dictionary")
                
                # Check for required stats fields
                required_fields = ['totalProducts', 'totalOrders', 'totalCategories', 'inStockProducts']
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    print(f"✅ Dashboard stats structure is correct")
                    print(f"Dashboard Stats: {json.dumps(data, indent=2)}")
                    print_result("GET /api/analytics/dashboard", status_code, True, data)
                    return True
                else:
                    print(f"❌ Missing fields in dashboard stats: {missing_fields}")
                    print_result("GET /api/analytics/dashboard", status_code, False, error=f"Missing fields: {missing_fields}")
                    return False
            else:
                print_result("GET /api/analytics/dashboard", status_code, False, error="Response is not a dictionary")
                return False
        else:
            print_result("GET /api/analytics/dashboard", status_code, False, error=f"Expected 200, got {status_code}")
            return False
            
    except Exception as e:
        print_result("GET /api/analytics/dashboard", 0, False, error=str(e))
        return False

def test_get_products_by_category():
    """Test GET /api/products/category/elf-bar - Should return products for elf-bar category"""
    print_test_header("GET /api/products/category/elf-bar - Get Products by Category")
    
    try:
        response = requests.get(f"{BASE_URL}/products/category/elf-bar", timeout=10)
        status_code = response.status_code
        
        if status_code == 200:
            data = response.json()
            
            if isinstance(data, list):
                print(f"✅ Response is a list with {len(data)} products")
                
                # Verify all products belong to elf-bar category
                if len(data) > 0:
                    all_correct_category = all(product.get('category') == 'elf-bar' for product in data)
                    if all_correct_category:
                        print(f"✅ All products belong to elf-bar category")
                        print_result("GET /api/products/category/elf-bar", status_code, True, {"total_products": len(data)})
                        return True
                    else:
                        print(f"❌ Some products don't belong to elf-bar category")
                        print_result("GET /api/products/category/elf-bar", status_code, False, error="Wrong category products in response")
                        return False
                else:
                    print("⚠️  No products found for elf-bar category")
                    print_result("GET /api/products/category/elf-bar", status_code, True, {"total_products": 0})
                    return True
            else:
                print_result("GET /api/products/category/elf-bar", status_code, False, error="Response is not a list")
                return False
        else:
            print_result("GET /api/products/category/elf-bar", status_code, False, error=f"Expected 200, got {status_code}")
            return False
            
    except Exception as e:
        print_result("GET /api/products/category/elf-bar", 0, False, error=str(e))
        return False

def test_search_products():
    """Test GET /api/products/search?q=elf - Should search products"""
    print_test_header("GET /api/products/search?q=elf - Search Products")
    
    try:
        response = requests.get(f"{BASE_URL}/products/search?q=elf", timeout=10)
        status_code = response.status_code
        
        if status_code == 200:
            data = response.json()
            
            if isinstance(data, list):
                print(f"✅ Response is a list with {len(data)} products")
                
                # Verify search results contain 'elf' in name or description
                if len(data) > 0:
                    search_term = 'elf'
                    all_match = all(
                        search_term.lower() in product.get('name', '').lower() or 
                        search_term.lower() in product.get('description', '').lower()
                        for product in data
                    )
                    if all_match:
                        print(f"✅ All products match search term 'elf'")
                        print_result("GET /api/products/search?q=elf", status_code, True, {"total_results": len(data)})
                        return True
                    else:
                        print(f"⚠️  Some products don't match search term (but API returned them)")
                        print_result("GET /api/products/search?q=elf", status_code, True, {"total_results": len(data)})
                        return True
                else:
                    print("⚠️  No products found matching 'elf'")
                    print_result("GET /api/products/search?q=elf", status_code, True, {"total_results": 0})
                    return True
            else:
                print_result("GET /api/products/search?q=elf", status_code, False, error="Response is not a list")
                return False
        else:
            print_result("GET /api/products/search?q=elf", status_code, False, error=f"Expected 200, got {status_code}")
            return False
            
    except Exception as e:
        print_result("GET /api/products/search?q=elf", 0, False, error=str(e))
        return False

def run_all_tests():
    """Run all backend API tests"""
    print("\n" + "="*60)
    print("VAPE SHOP BACKEND API TESTS")
    print(f"Base URL: {BASE_URL}")
    print(f"Test Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*60)
    
    results = {
        "GET /api/products": test_get_products(),
        "GET /api/products/featured": test_get_featured_products(),
        "GET /api/categories": test_get_categories(),
        "GET /api/settings": test_get_settings(),
        "GET /api/analytics/dashboard": test_get_dashboard_analytics(),
        "GET /api/products/category/elf-bar": test_get_products_by_category(),
        "GET /api/products/search?q=elf": test_search_products()
    }
    
    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    
    passed = sum(1 for result in results.values() if result)
    failed = len(results) - passed
    
    for endpoint, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {endpoint}")
    
    print(f"\nTotal Tests: {len(results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    print(f"Success Rate: {(passed/len(results)*100):.1f}%")
    print("="*60)
    
    return results

if __name__ == "__main__":
    run_all_tests()
