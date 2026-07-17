# API Contracts & Backend Implementation Plan

## Database Collections

### 1. Products Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "category": String,
  "price": Number,
  "image": String,
  "description": String,
  "inStock": Boolean,
  "featured": Boolean,
  "createdAt": DateTime,
  "updatedAt": DateTime
}
```

### 2. Categories Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "slug": String,
  "createdAt": DateTime,
  "updatedAt": DateTime
}
```

### 3. Orders Collection
```json
{
  "_id": ObjectId,
  "customerName": String,
  "phone": String,
  "products": [{
    "productId": ObjectId,
    "quantity": Number
  }],
  "totalAmount": Number,
  "status": String (enum: pending, processing, completed, cancelled),
  "createdAt": DateTime,
  "updatedAt": DateTime
}
```

### 4. Settings Collection
```json
{
  "_id": ObjectId,
  "siteName": String,
  "siteTagline": String,
  "topBarEnabled": Boolean,
  "topBarMessage": String,
  "topBarBackgroundColor": String,
  "whatsappNumber": String,
  "phone": String,
  "alternatePhone": String,
  "email": String,
  "address": String,
  "facebookUrl": String,
  "instagramUrl": String,
  "twitterUrl": String,
  "heroTitle": String,
  "heroSubtitle": String,
  "heroTagline": String,
  "heroDescription": String,
  "heroButtonText": String,
  "heroBackgroundImage": String,
  "primaryColor": String,
  "secondaryColor": String,
  "showWhatsAppButton": Boolean,
  "showCallButton": Boolean,
  "enableSearch": Boolean,
  "logoUrl": String,
  "faviconUrl": String,
  "updatedAt": DateTime
}
```

## API Endpoints

### Products APIs
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/category/:slug` - Get products by category
- `GET /api/products/featured` - Get featured products
- `GET /api/products/search?q=query` - Search products

### Categories APIs
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Orders APIs
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Settings APIs
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings

### Analytics APIs
- `GET /api/analytics/dashboard` - Get dashboard stats

## Frontend Integration Points

### Mock Data to Replace
Files to update after backend integration:
1. `/app/frontend/src/mockData.js` - Remove mock data
2. All components importing from mockData.js

### API Service Layer
Create `/app/frontend/src/services/api.js` for centralized API calls

### Components to Update
1. **Home.jsx** - Fetch featured products and settings
2. **CategoryPage.jsx** - Fetch products by category
3. **SearchPage.jsx** - Fetch search results
4. **ProductCard.jsx** - Use dynamic settings
5. **Header.jsx** - Use dynamic settings
6. **Footer.jsx** - Use dynamic settings
7. **Admin Components** - Connect to actual APIs

## Migration Strategy
1. Create MongoDB models
2. Create API endpoints
3. Seed initial data from mockData.js
4. Create frontend API service layer
5. Update components one by one
6. Test each integration
7. Remove mock data
