import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime
import os

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Mock Data
categories_data = [
    {"name": "New Arrivals", "slug": "new-arrivals", "createdAt": datetime.utcnow(), "updatedAt": datetime.utcnow()},
    {"name": "Elf Bar", "slug": "elf-bar", "createdAt": datetime.utcnow(), "updatedAt": datetime.utcnow()},
    {"name": "Nic Salts", "slug": "nic-salts", "createdAt": datetime.utcnow(), "updatedAt": datetime.utcnow()},
    {"name": "IGET Vape", "slug": "iget-vape", "createdAt": datetime.utcnow(), "updatedAt": datetime.utcnow()},
    {"name": "Terra", "slug": "terra", "createdAt": datetime.utcnow(), "updatedAt": datetime.utcnow()}
]

products_data = [
    {
        "name": "Elf Bar 600 - Blue Razz Ice",
        "category": "elf-bar",
        "price": 599,
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976",
        "description": "Elf Bar 600 puffs disposable vape with Blue Razz Ice flavor",
        "inStock": True,
        "featured": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Elf Bar 600 - Watermelon",
        "category": "elf-bar",
        "price": 599,
        "image": "https://images.unsplash.com/photo-1579165466814-e646cfa4a3be",
        "description": "Elf Bar 600 puffs disposable vape with Watermelon flavor",
        "inStock": True,
        "featured": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "IGET Bar - Strawberry Kiwi",
        "category": "iget-vape",
        "price": 699,
        "image": "https://images.unsplash.com/photo-1545095088-26a59e3f2717",
        "description": "IGET Bar disposable vape with 5000 puffs",
        "inStock": True,
        "featured": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "IGET Legend - Pineapple Ice",
        "category": "iget-vape",
        "price": 899,
        "image": "https://images.unsplash.com/photo-1594189741508-5212175833ad",
        "description": "IGET Legend disposable vape with 4000 puffs",
        "inStock": True,
        "featured": False,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "ElfLiq Nic Salt - Cherry Cola",
        "category": "nic-salts",
        "price": 449,
        "image": "https://images.unsplash.com/photo-1601582037054-66c0611f6033",
        "description": "10ml Nic Salt E-Liquid, 20mg strength",
        "inStock": True,
        "featured": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "ElfLiq Nic Salt - Blue Razz",
        "category": "nic-salts",
        "price": 449,
        "image": "https://images.unsplash.com/photo-1601568656096-bde429d5d386",
        "description": "10ml Nic Salt E-Liquid, 20mg strength",
        "inStock": True,
        "featured": False,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Terra Vape Pod - Mint",
        "category": "terra",
        "price": 799,
        "image": "https://images.pexels.com/photos/12643761/pexels-photo-12643761.jpeg",
        "description": "Terra refillable pod system with Mint flavor",
        "inStock": True,
        "featured": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Terra Vape Pod - Mango",
        "category": "terra",
        "price": 799,
        "image": "https://images.pexels.com/photos/11587603/pexels-photo-11587603.jpeg",
        "description": "Terra refillable pod system with Mango flavor",
        "inStock": True,
        "featured": False,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Elf Bar 800 - Pink Lemonade",
        "category": "elf-bar",
        "price": 649,
        "image": "https://images.pexels.com/photos/5533351/pexels-photo-5533351.jpeg",
        "description": "Elf Bar 800 puffs disposable vape with Pink Lemonade flavor",
        "inStock": True,
        "featured": False,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "IGET King - Grape Ice",
        "category": "iget-vape",
        "price": 749,
        "image": "https://images.pexels.com/photos/19901864/pexels-photo-19901864.jpeg",
        "description": "IGET King disposable vape with 2600 puffs",
        "inStock": True,
        "featured": False,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "ElfLiq Nic Salt - Strawberry Ice",
        "category": "nic-salts",
        "price": 449,
        "image": "https://images.pexels.com/photos/19344605/pexels-photo-19344605.jpeg",
        "description": "10ml Nic Salt E-Liquid, 20mg strength",
        "inStock": True,
        "featured": False,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Elf Bar 600 - Strawberry Banana",
        "category": "elf-bar",
        "price": 599,
        "image": "https://images.pexels.com/photos/33070762/pexels-photo-33070762.jpeg",
        "description": "Elf Bar 600 puffs disposable vape with Strawberry Banana flavor",
        "inStock": False,
        "featured": False,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
]

settings_data = {
    "siteName": "Vape Shop Chennai",
    "siteTagline": "Your one-stop destination for premium vapes, authentic products and unmatched quality.",
    "topBarEnabled": True,
    "topBarMessage": "WhatsApp Order is Accepted - 7877475920",
    "topBarBackgroundColor": "#2d2d2d",
    "whatsappNumber": "917877475920",
    "phone": "7877475920",
    "alternatePhone": "",
    "email": "info@vapeshopschennai.shop",
    "address": "Chennai, Tamil Nadu",
    "facebookUrl": "https://facebook.com",
    "instagramUrl": "https://instagram.com",
    "twitterUrl": "https://twitter.com",
    "heroTitle": "VAPE SHOP",
    "heroSubtitle": "CHENNAI",
    "heroTagline": "PREMIUM VAPES. AUTHENTIC EXPERIENCE.",
    "heroDescription": "Your one-stop destination for premium vapes, authentic products and unmatched quality.",
    "heroButtonText": "Shop Now",
    "heroBackgroundImage": "https://images.unsplash.com/photo-1594189741508-5212175833ad?w=1920",
    "primaryColor": "#d4af37",
    "secondaryColor": "#25D366",
    "showWhatsAppButton": True,
    "showCallButton": True,
    "enableSearch": True,
    "logoUrl": "",
    "faviconUrl": "",
    "updatedAt": datetime.utcnow()
}

async def seed_database():
    print("Starting database seeding...")
    
    # Clear existing data
    await db.products.delete_many({})
    await db.categories.delete_many({})
    await db.settings.delete_many({})
    print("✓ Cleared existing data")
    
    # Insert categories
    await db.categories.insert_many(categories_data)
    print(f"✓ Inserted {len(categories_data)} categories")
    
    # Insert products
    await db.products.insert_many(products_data)
    print(f"✓ Inserted {len(products_data)} products")
    
    # Insert settings
    await db.settings.insert_one(settings_data)
    print("✓ Inserted settings")
    
    print("\\n✅ Database seeding completed successfully!")
    
if __name__ == "__main__":
    asyncio.run(seed_database())
    client.close()
