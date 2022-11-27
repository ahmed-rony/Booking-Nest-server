const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const authRoute = require('./routes/auths.js');
const userRoute = require('./routes/users.js');
const hotelRoute = require('./routes/hotels.js');
const roomRoute = require('./routes/rooms.js');

const app = express();
const port = 30000;

// ===========  middleware  ==========
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
// =================  mongoDb connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('mongoDB connected');
  } catch (error) {
    throw error;
  }
}
// =====================================
app.use('/api/auths', authRoute);
app.use('/api/users', userRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/rooms', roomRoute);

// ========  error middleware ==========
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).send({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
})

// =====================================
app.get('/', (req, res) => {
  res.send('acio..');
})


app.listen(port, () => {
  connect();
  console.log('running..');
})