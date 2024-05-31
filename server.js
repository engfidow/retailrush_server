const express = require('express');
const connectDB = require('./config/db');
const categoryRouter = require('./routes/Category');
const productRouter = require('./routes/Product');
const userRouter = require('./routes/User');
const orderRouter = require('./routes/Order');
const paymentsRouter = require('./routes/Payments');
const promotionsRouter = require('./routes/Promotions');
require('dotenv').config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json()); // for parsing application/json

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: 'An internal server error occurred.' });
});

app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', userRouter);
app.use('/api', orderRouter);
app.use('/api', paymentsRouter);
app.use('/api', promotionsRouter);
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`+ ` 🔥`);
});



