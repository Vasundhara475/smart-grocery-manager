const GroceryItem = require('../models/GroceryItem');

// @desc    Get all items for logged-in user
// @route   GET /api/grocery
// @access  Private
const getItems = async (req, res) => {
  try {
    const { category, search, inShoppingList } = req.query;
    let query = { user: req.user._id };

    if (category && category !== 'All') query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (inShoppingList === 'true') query.inShoppingList = true;

    const items = await GroceryItem.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new grocery item
// @route   POST /api/grocery
// @access  Private
const addItem = async (req, res) => {
  try {
    const item = await GroceryItem.create({ ...req.body, user: req.user._id });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update grocery item
// @route   PUT /api/grocery/:id
// @access  Private
const updateItem = async (req, res) => {
  try {
    const item = await GroceryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedItem = await GroceryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete grocery item
// @route   DELETE /api/grocery/:id
// @access  Private
const deleteItem = async (req, res) => {
  try {
    const item = await GroceryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await item.deleteOne();
    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/grocery/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const userId   = req.user._id;
    const now      = new Date();
    const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    const total = await GroceryItem.countDocuments({ user: userId });
    const lowStock = await GroceryItem.countDocuments({
      user: userId,
      $expr: { $lte: ['$quantity', '$minStockLevel'] },
    });
    const expiringSoon = await GroceryItem.countDocuments({
      user: userId,
      expiryDate: { $lte: threeDays, $gte: now },
    });
    const inShoppingList = await GroceryItem.countDocuments({
      user: userId,
      inShoppingList: true,
    });

    const byCategory = await GroceryItem.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    res.json({ total, lowStock, expiringSoon, inShoppingList, byCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getItems, addItem, updateItem, deleteItem, getDashboardStats };