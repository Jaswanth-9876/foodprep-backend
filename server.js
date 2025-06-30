const express = require('express');
const app = express();
const connectDB = require('./config/dbConn');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static('uploads'));


app.use('/api/food', require('./routes/foodRouter'));
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/cart', require('./routes/cartRouter'));
app.use('/api/order', require('./routes/orderRouter'));

app.get("/", (req, res) => {
  res.send("API Working");
});

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

startServer();
