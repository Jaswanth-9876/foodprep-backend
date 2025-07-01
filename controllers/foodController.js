const foodModel = require('../models/foodModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dxsko86rc',
  api_key: '415441847785791',
  api_secret: 'xvC9U3A-bO2cbfkU1GGOoNSc_Qo',
});

const addFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const result = await cloudinary.uploader.upload(image, {
      folder: 'foodprep',
    });

    await foodModel.create({
      name,
      description,
      price,
      category,
      image: result.secure_url,
    });

    res.status(201).json({ message: "Food added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding food" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error listing food" });
  }
};

const removeFood = async (req, res) => {
  try {
    const { id } = req.query;
    const food = await foodModel.findById(id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    await foodModel.deleteOne({ _id: id });
    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting foods" });
  }
};

module.exports = { addFood, listFood, removeFood };
