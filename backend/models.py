from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

# Product Models
class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    image: str
    description: str
    inStock: bool = True
    featured: bool = False

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    description: Optional[str] = None
    inStock: Optional[bool] = None
    featured: Optional[bool] = None

class Product(BaseModel):
    id: str = Field(alias="_id")
    name: str
    category: str
    price: float
    image: str
    description: str
    inStock: bool
    featured: bool
    createdAt: datetime
    updatedAt: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

# Category Models
class CategoryCreate(BaseModel):
    name: str
    slug: str

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None

class Category(BaseModel):
    id: str = Field(alias="_id")
    name: str
    slug: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

# Order Models
class OrderProduct(BaseModel):
    productId: str
    quantity: int

class OrderCreate(BaseModel):
    customerName: str
    phone: str
    products: List[OrderProduct]
    totalAmount: float
    status: str = "pending"

class OrderUpdate(BaseModel):
    customerName: Optional[str] = None
    phone: Optional[str] = None
    products: Optional[List[OrderProduct]] = None
    totalAmount: Optional[float] = None
    status: Optional[str] = None

class Order(BaseModel):
    id: str = Field(alias="_id")
    customerName: str
    phone: str
    products: List[OrderProduct]
    totalAmount: float
    status: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

# Settings Models
class SettingsUpdate(BaseModel):
    siteName: Optional[str] = None
    siteTagline: Optional[str] = None
    topBarEnabled: Optional[bool] = None
    topBarMessage: Optional[str] = None
    topBarBackgroundColor: Optional[str] = None
    whatsappNumber: Optional[str] = None
    phone: Optional[str] = None
    alternatePhone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    facebookUrl: Optional[str] = None
    instagramUrl: Optional[str] = None
    twitterUrl: Optional[str] = None
    heroTitle: Optional[str] = None
    heroSubtitle: Optional[str] = None
    heroTagline: Optional[str] = None
    heroDescription: Optional[str] = None
    heroButtonText: Optional[str] = None
    heroBackgroundImage: Optional[str] = None
    primaryColor: Optional[str] = None
    secondaryColor: Optional[str] = None
    showWhatsAppButton: Optional[bool] = None
    showCallButton: Optional[bool] = None
    enableSearch: Optional[bool] = None
    logoUrl: Optional[str] = None
    faviconUrl: Optional[str] = None

class Settings(BaseModel):
    id: str = Field(alias="_id")
    siteName: str
    siteTagline: str
    topBarEnabled: bool
    topBarMessage: str
    topBarBackgroundColor: str
    whatsappNumber: str
    phone: str
    alternatePhone: str
    email: str
    address: str
    facebookUrl: str
    instagramUrl: str
    twitterUrl: str
    heroTitle: str
    heroSubtitle: str
    heroTagline: str
    heroDescription: str
    heroButtonText: str
    heroBackgroundImage: str
    primaryColor: str
    secondaryColor: str
    showWhatsAppButton: bool
    showCallButton: bool
    enableSearch: bool
    logoUrl: str
    faviconUrl: str
    updatedAt: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
