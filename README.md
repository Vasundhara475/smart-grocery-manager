# 🛒 Smart Grocery List & Inventory Manager


A full-stack Progressive Web App for smart pantry and grocery management. Track inventory, get low-stock and expiry alerts, auto-generate shopping lists from recipes, and sync a shared list across family members — available offline.

---

## 🚀 Live Demo

> 🔗 https://www.loom.com/share/6e134212dca0483c95457741d3c3961e

---
## 📸 Screenshots


| <img src="https://github.com/user-attachments/assets/25716986-baf4-41ab-b7e8-063fffb1b8ed" width="350" /> | <img src="https://github.com/user-attachments/assets/60349daa-d60f-4c02-800f-45014387d1de" width="350" /> |
| <img src="https://github.com/user-attachments/assets/f8120c31-9dcb-4b02-bea0-fe1351b94f60" width="350" /> | <img src="https://github.com/user-attachments/assets/f439631e-8757-429c-844e-0947e49097fb" width="350" /> |

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login with family member role management
- 🥫 **Inventory Tracking** — Add items with quantity, category, expiry date, and unit
- ⚠️ **Low-Stock Alerts** — Automatic alert when item quantity falls below threshold
- 📅 **Expiry Alerts** — Scheduled cron job checks expiry daily and flags near-expiry items
- 🍲 **Recipe-Based Lists** — Save recipes and auto-generate shopping lists from missing ingredients
- 👨‍👩‍👧 **Family Shared Lists** — Multiple users share and edit the same grocery list in real time
- 🔍 **Search & Filter** — Filter by category, expiry status, stock level
- 📦 **Restock Predictions** — Suggests reorder quantity based on usage history
- 📱 **Offline PWA** — Service worker caches data for offline access and mobile install

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, React Router v6, Axios |
| Styling | Tailwind CSS, React Hot Toast |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ODM |
| Authentication | JWT, bcrypt.js |
| Scheduled Jobs | node-cron |
| PWA | Service Worker, Web App Manifest |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 📁 Folder Structure

```
smart-grocery-manager/
│
├── client/                         # React PWA frontend
│   ├── public/
│   │   ├── manifest.json           # PWA manifest
│   │   └── service-worker.js       # Offline caching
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── GroceryItemCard.jsx
│       │   ├── StockBadge.jsx
│       │   ├── ExpiryAlert.jsx
│       │   ├── RecipeCard.jsx
│       │   └── LowStockBanner.jsx
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── GroceryList.jsx
│       │   ├── Inventory.jsx
│       │   ├── Recipes.jsx
│       │   ├── Alerts.jsx
│       │   └── FamilySettings.jsx
│       ├── context/
│       ├── hooks/
│       ├── utils/
│       └── App.jsx
│
├── server/                         # Node.js + Express backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── groceryController.js
│   │   ├── inventoryController.js
│   │   ├── recipeController.js
│   │   └── alertController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validateMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── GroceryItem.js
│   │   ├── Recipe.js
│   │   └── Alert.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── groceryRoutes.js
│   │   ├── recipeRoutes.js
│   │   └── alertRoutes.js
│   ├── jobs/
│   │   └── expiryCheckJob.js       # node-cron daily expiry check
│   └── server.js
│
├── docs/
│   └── screenshots/
├── .env.example
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js v18+
- MongoDB (local) or MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-grocery-manager.git
cd smart-grocery-manager
```

### 2. Setup the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
LOW_STOCK_THRESHOLD=3
EXPIRY_ALERT_DAYS=5
```

Start the backend:

```bash
npm run dev
```

### 3. Setup the frontend

```bash
cd ../client
npm install
```

Create a `.env` file inside `client/`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the React app:

```bash
npm start
```

### 4. Open in browser

```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

---

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/me` | Get current user |

### Grocery Item Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/grocery` | Get all grocery items |
| POST | `/api/grocery` | Add new item |
| PUT | `/api/grocery/:id` | Update item (quantity, expiry) |
| DELETE | `/api/grocery/:id` | Delete an item |
| GET | `/api/grocery/low-stock` | Get items below threshold |
| GET | `/api/grocery/expiring` | Get items expiring soon |

### Recipe Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | Get all saved recipes |
| POST | `/api/recipes` | Add a new recipe |
| POST | `/api/recipes/:id/generate-list` | Generate shopping list from recipe |

### Alert Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/alerts` | Get all active alerts |
| PUT | `/api/alerts/:id/dismiss` | Dismiss an alert |

---

## 🗃️ Database Schema

### User Model
```js
{
  name: String,
  email: { type: String, unique: true },
  password: String (hashed),
  familyGroupId: ObjectId,
  role: Enum ['owner', 'member'],
  createdAt: Date
}
```

### GroceryItem Model
```js
{
  userId: ObjectId (ref: User),
  familyGroupId: ObjectId,
  name: String,
  category: String,
  quantity: Number,
  unit: String,
  expiryDate: Date,
  lowStockThreshold: Number,
  isOnShoppingList: Boolean,
  createdAt: Date
}
```

### Recipe Model
```js
{
  userId: ObjectId (ref: User),
  title: String,
  ingredients: [{ name: String, quantity: Number, unit: String }],
  instructions: String,
  createdAt: Date
}
```

### Alert Model
```js
{
  userId: ObjectId (ref: User),
  itemId: ObjectId (ref: GroceryItem),
  type: Enum ['low_stock', 'expiry'],
  message: String,
  dismissed: Boolean,
  createdAt: Date
}
```

---

## ⏰ Cron Job — Expiry & Low Stock Check

The server runs a daily background job using `node-cron`:

```js
// Runs every day at 8:00 AM
cron.schedule('0 8 * * *', async () => {
  // Check items expiring within EXPIRY_ALERT_DAYS
  // Check items below LOW_STOCK_THRESHOLD
  // Create Alert documents for flagged items
});
```

---

## 🔄 User Workflow

```
Login / Register
      ↓
Add pantry items with quantity and expiry date
      ↓
System monitors stock levels and expiry daily
      ↓
Get alert when item is low-stock or near expiry
      ↓
Save a recipe → auto-generate shopping list
      ↓
Mark items as purchased → inventory updates
      ↓
Family members see live shared list
```

---

## 🚢 Deployment

### Frontend → Vercel

```bash
cd client && npm run build
# Connect GitHub repo on vercel.com
```

### Backend → Render

1. Push to GitHub
2. New Web Service on [render.com](https://render.com)
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables in Render dashboard

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👨‍💻 Author

**Your Name**
- GitHub: https://github.com/Vasundhara475
- LinkedIn: www.linkedin.com/in/vasundhara-suryawanshi

---

> ⭐ If you found this project helpful, please give it a star on GitHub!
