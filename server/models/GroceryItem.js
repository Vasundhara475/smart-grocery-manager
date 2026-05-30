const mongoose = require('mongoose');

const groceryItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
  },
  category: {
    type: String,
    enum: ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Beverages',
           'Snacks', 'Grains', 'Frozen', 'Condiments', 'Other'],
    default: 'Other',
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative'],
  },
  unit: {
    type: String,
    enum: ['kg', 'g', 'L', 'ml', 'pcs', 'dozen', 'pack'],
    default: 'pcs',
  },
  minStockLevel: {
    type: Number,
    default: 2,
  },
  expiryDate: {
    type: Date,
    default: null,
  },
  price: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
    maxlength: [200, 'Notes cannot exceed 200 characters'],
  },
  inShoppingList: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: '',
  },
}, { timestamps: true });

// Virtual: check if item is low stock
groceryItemSchema.virtual('isLowStock').get(function () {
  return this.quantity <= this.minStockLevel;
});

// Virtual: check if expiring within 3 days
groceryItemSchema.virtual('isExpiringSoon').get(function () {
  if (!this.expiryDate) return false;
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
  return this.expiryDate <= threeDaysFromNow;
});

module.exports = mongoose.model('GroceryItem', groceryItemSchema);