const Chef = require('../models/chefModel');

// 1. GET ALL: Show the full menu
const getAllChefs = async (req, res) => {
  try {
    const chefs = await chef.find(); // .find() means "Get Everything"
    res.status(200).json(chefs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. CREATE: Add a new food item
const createChefs = async (req, res) => {
  try {
    const newChef = await Chef.create(req.body); // .create() means "Save New"
    res.status(201).json(newChef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. GET ONE: Find a specific food by ID
const getChefById = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id); // Find by the ID number
    if (!chef) return res.status(404).json({ message: 'Chef not found' });
    res.status(200).json(chef);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 4. UPDATE: Change a price or name
const updateChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!chef) return res.status(404).json({ message: 'Chef not found' });
    res.status(200).json(chef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 5. DELETE: Remove an item from menu
const deleteChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndDelete(req.params.id);
    if (!chef) return res.status(404).json({ message: 'Chef not found' });
    res.status(200).json({ message: 'Chef deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export these "skills" route can use them
module.exports = {
  getAllChefs,
  createChefs,
  getChefById,
  updateChef,
  deleteChef,
};
