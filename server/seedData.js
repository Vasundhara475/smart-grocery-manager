require('dotenv').config();
const mongoose    = require('mongoose');
const GroceryItem = require('./models/GroceryItem');
const User        = require('./models/User');

// ── Demo credentials (change if you want) ──────────
const DEMO_EMAIL    = 'demo@grocery.com';
const DEMO_PASSWORD = 'demo1234';
const DEMO_NAME     = 'Demo User';

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

const items = [
  { name: 'Full Fat Milk',      category: 'Dairy',      quantity: 1,  unit: 'L',    minStockLevel: 2, price: 65,  expiryDate: daysFromNow(3)  },
  { name: 'Farm Eggs',          category: 'Dairy',      quantity: 12, unit: 'pcs',  minStockLevel: 6, price: 90                              },
  { name: 'Tomatoes',           category: 'Vegetables', quantity: 4,  unit: 'kg',   minStockLevel: 1, price: 40,  expiryDate: daysFromNow(5)  },
  { name: 'Bananas',            category: 'Fruits',     quantity: 6,  unit: 'pcs',  minStockLevel: 4, price: 60                              },
  { name: 'Chicken Breast',     category: 'Meat',       quantity: 1,  unit: 'kg',   minStockLevel: 1, price: 380, expiryDate: daysFromNow(2)  },
  { name: 'Basmati Rice',       category: 'Grains',     quantity: 5,  unit: 'kg',   minStockLevel: 2, price: 180                             },
  { name: 'Mineral Water',      category: 'Beverages',  quantity: 2,  unit: 'L',    minStockLevel: 4, price: 25                              },
  { name: 'Potato Chips',       category: 'Snacks',     quantity: 0,  unit: 'pack', minStockLevel: 2, price: 30,  inShoppingList: true        },
  { name: 'Frozen Peas',        category: 'Frozen',     quantity: 3,  unit: 'pack', minStockLevel: 1, price: 85                              },
  { name: 'Tomato Ketchup',     category: 'Condiments', quantity: 1,  unit: 'pcs',  minStockLevel: 1, price: 99,  expiryDate: daysFromNow(-5) },
  { name: 'Greek Yogurt',       category: 'Dairy',      quantity: 2,  unit: 'pcs',  minStockLevel: 2, price: 120, expiryDate: daysFromNow(1)  },
  { name: 'Spinach',            category: 'Vegetables', quantity: 1,  unit: 'kg',   minStockLevel: 1, price: 55,  expiryDate: daysFromNow(2)  },
  { name: 'Orange Juice',       category: 'Beverages',  quantity: 1,  unit: 'L',    minStockLevel: 2, price: 80,  inShoppingList: true        },
  { name: 'Whole Wheat Bread',  category: 'Grains',     quantity: 1,  unit: 'pcs',  minStockLevel: 1, price: 45,  expiryDate: daysFromNow(4)  },
  { name: 'Olive Oil',          category: 'Condiments', quantity: 1,  unit: 'L',    minStockLevel: 1, price: 350                             },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('🔗 Connected to MongoDB');

  // ── Find or create demo user ────────────────────
  let user = await User.findOne({ email: DEMO_EMAIL });

  if (user) {
    console.log('👤 Demo user already exists – resetting password');
    user.password = DEMO_PASSWORD;
    await user.save();
  } else {
    user = await User.create({ name: DEMO_NAME, email: DEMO_EMAIL, password: DEMO_PASSWORD });
    console.log(`✅ Demo user created → ${DEMO_EMAIL}`);
  }

  // ── Clear old seeded items for this user ────────
  await GroceryItem.deleteMany({ user: user._id });
  console.log('🗑️  Cleared existing items for demo user');

  // ── Insert fresh items ──────────────────────────
  const toInsert = items.map(i => ({ ...i, user: user._id }));
  await GroceryItem.insertMany(toInsert);
  console.log(`✅ Seeded ${toInsert.length} grocery items`);

  console.log('\n─────────────────────────────────');
  console.log('🎉 Demo credentials:');
  console.log(`   📧 Email    : ${DEMO_EMAIL}`);
  console.log(`   🔑 Password : ${DEMO_PASSWORD}`);
  console.log('─────────────────────────────────\n');

  mongoose.disconnect();
}

seed().catch(console.error);