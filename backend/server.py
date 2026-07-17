from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime
from bson import ObjectId
from typing import List, Optional
import os
import logging

from models import (
    Product, ProductCreate, ProductUpdate,
    Category, CategoryCreate, CategoryUpdate,
    Order, OrderCreate, OrderUpdate,
    Settings, SettingsUpdate
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
products_collection = db.products
categories_collection = db.categories
orders_collection = db.orders
settings_collection = db.settings

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Helper function to convert ObjectId to string
def product_helper(product) -> dict:
    return {
        "_id": str(product["_id"]),
        "name": product["name"],
        "category": product["category"],
        "price": product["price"],
        "image": product["image"],
        "description": product["description"],
        "inStock": product["inStock"],
        "featured": product["featured"],
        "createdAt": product.get("createdAt", datetime.utcnow()),
        "updatedAt": product.get("updatedAt", datetime.utcnow())
    }

def category_helper(category) -> dict:
    return {
        "_id": str(category["_id"]),
        "name": category["name"],
        "slug": category["slug"],
        "createdAt": category.get("createdAt", datetime.utcnow()),
        "updatedAt": category.get("updatedAt", datetime.utcnow())
    }

def order_helper(order) -> dict:
    return {
        "_id": str(order["_id"]),
        "customerName": order["customerName"],
        "phone": order["phone"],
        "products": order["products"],
        "totalAmount": order["totalAmount"],
        "status": order["status"],
        "createdAt": order.get("createdAt", datetime.utcnow()),
        "updatedAt": order.get("updatedAt", datetime.utcnow())
    }

def settings_helper(settings) -> dict:
    return {
        "_id": str(settings["_id"]),
        **{k: v for k, v in settings.items() if k != "_id"},
        "updatedAt": settings.get("updatedAt", datetime.utcnow())
    }

# ===== PRODUCTS ROUTES =====
@api_router.get("/products", response_model=List[dict])
async def get_products():
    products = []
    async for product in products_collection.find():
        products.append(product_helper(product))
    return products

@api_router.get("/products/featured", response_model=List[dict])
async def get_featured_products():
    products = []
    async for product in products_collection.find({"featured": True}):
        products.append(product_helper(product))
    return products

@api_router.get("/products/category/{slug}", response_model=List[dict])
async def get_products_by_category(slug: str):
    products = []
    async for product in products_collection.find({"category": slug}):
        products.append(product_helper(product))
    return products

@api_router.get("/products/search", response_model=List[dict])
async def search_products(q: str):
    products = []
    async for product in products_collection.find({
        "$or": [
            {"name": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}}
        ]
    }):
        products.append(product_helper(product))
    return products

@api_router.get("/products/{product_id}", response_model=dict)
async def get_product(product_id: str):
    product = await products_collection.find_one({"_id": ObjectId(product_id)})
    if product:
        return product_helper(product)
    raise HTTPException(status_code=404, detail="Product not found")

@api_router.post("/products", response_model=dict)
async def create_product(product: ProductCreate):
    product_dict = product.dict()
    product_dict["createdAt"] = datetime.utcnow()
    product_dict["updatedAt"] = datetime.utcnow()
    result = await products_collection.insert_one(product_dict)
    new_product = await products_collection.find_one({"_id": result.inserted_id})
    return product_helper(new_product)

@api_router.put("/products/{product_id}", response_model=dict)
async def update_product(product_id: str, product: ProductUpdate):
    update_data = {k: v for k, v in product.dict().items() if v is not None}
    if update_data:
        update_data["updatedAt"] = datetime.utcnow()
        await products_collection.update_one(
            {"_id": ObjectId(product_id)},
            {"$set": update_data}
        )
    updated_product = await products_collection.find_one({"_id": ObjectId(product_id)})
    if updated_product:
        return product_helper(updated_product)
    raise HTTPException(status_code=404, detail="Product not found")

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    result = await products_collection.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count:
        return {"message": "Product deleted successfully"}
    raise HTTPException(status_code=404, detail="Product not found")

# ===== CATEGORIES ROUTES =====
@api_router.get("/categories", response_model=List[dict])
async def get_categories():
    categories = []
    async for category in categories_collection.find():
        categories.append(category_helper(category))
    return categories

@api_router.get("/categories/{category_id}", response_model=dict)
async def get_category(category_id: str):
    category = await categories_collection.find_one({"_id": ObjectId(category_id)})
    if category:
        return category_helper(category)
    raise HTTPException(status_code=404, detail="Category not found")

@api_router.post("/categories", response_model=dict)
async def create_category(category: CategoryCreate):
    category_dict = category.dict()
    category_dict["createdAt"] = datetime.utcnow()
    category_dict["updatedAt"] = datetime.utcnow()
    result = await categories_collection.insert_one(category_dict)
    new_category = await categories_collection.find_one({"_id": result.inserted_id})
    return category_helper(new_category)

@api_router.put("/categories/{category_id}", response_model=dict)
async def update_category(category_id: str, category: CategoryUpdate):
    update_data = {k: v for k, v in category.dict().items() if v is not None}
    if update_data:
        update_data["updatedAt"] = datetime.utcnow()
        await categories_collection.update_one(
            {"_id": ObjectId(category_id)},
            {"$set": update_data}
        )
    updated_category = await categories_collection.find_one({"_id": ObjectId(category_id)})
    if updated_category:
        return category_helper(updated_category)
    raise HTTPException(status_code=404, detail="Category not found")

@api_router.delete("/categories/{category_id}")
async def delete_category(category_id: str):
    result = await categories_collection.delete_one({"_id": ObjectId(category_id)})
    if result.deleted_count:
        return {"message": "Category deleted successfully"}
    raise HTTPException(status_code=404, detail="Category not found")

# ===== ORDERS ROUTES =====
@api_router.get("/orders", response_model=List[dict])
async def get_orders():
    orders = []
    async for order in orders_collection.find().sort("createdAt", -1):
        orders.append(order_helper(order))
    return orders

@api_router.get("/orders/{order_id}", response_model=dict)
async def get_order(order_id: str):
    order = await orders_collection.find_one({"_id": ObjectId(order_id)})
    if order:
        return order_helper(order)
    raise HTTPException(status_code=404, detail="Order not found")

@api_router.post("/orders", response_model=dict)
async def create_order(order: OrderCreate):
    order_dict = order.dict()
    order_dict["createdAt"] = datetime.utcnow()
    order_dict["updatedAt"] = datetime.utcnow()
    result = await orders_collection.insert_one(order_dict)
    new_order = await orders_collection.find_one({"_id": result.inserted_id})
    return order_helper(new_order)

@api_router.put("/orders/{order_id}", response_model=dict)
async def update_order(order_id: str, order: OrderUpdate):
    update_data = {k: v for k, v in order.dict().items() if v is not None}
    if update_data:
        update_data["updatedAt"] = datetime.utcnow()
        await orders_collection.update_one(
            {"_id": ObjectId(order_id)},
            {"$set": update_data}
        )
    updated_order = await orders_collection.find_one({"_id": ObjectId(order_id)})
    if updated_order:
        return order_helper(updated_order)
    raise HTTPException(status_code=404, detail="Order not found")

@api_router.patch("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: str):
    await orders_collection.update_one(
        {"_id": ObjectId(order_id)},
        {"$set": {"status": status, "updatedAt": datetime.utcnow()}}
    )
    updated_order = await orders_collection.find_one({"_id": ObjectId(order_id)})
    if updated_order:
        return order_helper(updated_order)
    raise HTTPException(status_code=404, detail="Order not found")

@api_router.delete("/orders/{order_id}")
async def delete_order(order_id: str):
    result = await orders_collection.delete_one({"_id": ObjectId(order_id)})
    if result.deleted_count:
        return {"message": "Order deleted successfully"}
    raise HTTPException(status_code=404, detail="Order not found")

# ===== SETTINGS ROUTES =====
@api_router.get("/settings", response_model=dict)
async def get_settings():
    settings = await settings_collection.find_one()
    if settings:
        return settings_helper(settings)
    raise HTTPException(status_code=404, detail="Settings not found")

@api_router.put("/settings", response_model=dict)
async def update_settings(settings: SettingsUpdate):
    update_data = {k: v for k, v in settings.dict().items() if v is not None}
    if update_data:
        update_data["updatedAt"] = datetime.utcnow()
        await settings_collection.update_one(
            {},
            {"$set": update_data},
            upsert=True
        )
    updated_settings = await settings_collection.find_one()
    if updated_settings:
        return settings_helper(updated_settings)
    raise HTTPException(status_code=404, detail="Settings not found")

# ===== ANALYTICS ROUTES =====
@api_router.get("/analytics/dashboard")
async def get_dashboard_stats():
    total_products = await products_collection.count_documents({})
    total_orders = await orders_collection.count_documents({})
    total_categories = await categories_collection.count_documents({})
    in_stock_products = await products_collection.count_documents({"inStock": True})
    
    return {
        "totalProducts": total_products,
        "totalOrders": total_orders,
        "totalCategories": total_categories,
        "inStockProducts": in_stock_products
    }

# Root route
@api_router.get("/")
async def root():
    return {"message": "Vape Shop API"}

# Include the router in the main app
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
