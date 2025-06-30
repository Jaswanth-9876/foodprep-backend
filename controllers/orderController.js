const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

// Place Order without Stripe
const placeOrder = async (req, res) => {
  try {
    const newOrder = await orderModel.create({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: true, 
    });

    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error placing order" });
  }
};

const verifyOrder = async (req, res) => {
  res.status(200).json({ message: "No payment verification required" });
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.status(200).json({ data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({ data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
