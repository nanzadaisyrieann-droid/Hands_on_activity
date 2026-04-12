const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String, // It must be text
    required: true, // You MUST provide a name
    unique: true, // No two dishes can have the same name
  },
  price: {
    type: Number, // It must be a number (10.99)
    required: true,
    min: [ 0, 'Price cannot be negative'],
    max: [1000, 'Price cannot exceed 1000'],
  },
  category: {
    type: String,
    // Only these 4 words are allowed
    enum: ['Starters', 'Main', 'Dessert', 'Drinks'],
    required: true,
    message: `{VALUE} is not a valid category`,
  },
  isVegetarian: {
    type: Boolean, // True or false
    default: false, // If you don't say, we assume it's NOT vegetarian
  },
  reviews: [
    {
      user: String,
      rating: { type: Number, min: 1, max: 5},
      comment: String
    },
  ],
  chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chef'
    }
});

module.exports = mongoose.model('Dish', dishSchema);
