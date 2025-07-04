// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import productRoutes from './routes/productRoutes.js';
// import offerRoutes from './routes/offerRoutes.js';
// import adVideoRoutes from './routes/adVideoRoutes.js';
// import emailRoutes from './routes/emailRoutes.js';

//  // frontend origin



// // Load env variables
// dotenv.config();

// // App setup
// const app = express();
// app.use(express.json());
// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(cors({ origin: 'http://localhost:3001' }));

// // MongoDB connect
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log('MongoDB Error:', err));

// // Sample route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Product routes
// app.use('/api/products', productRoutes);
// app.use('/api/offers', offerRoutes);
// app.use('/api/ads', adVideoRoutes);
// app.use('/api/email', emailRoutes);



// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import adVideoRoutes from './routes/adVideoRoutes.js';
import emailRoutes from './routes/emailRoutes.js';

// Load env variables
dotenv.config();

// App setup
const app = express();
app.use(express.json());

const allowedOrigins = ['https://rhiyaprinters.vercel.app', 'https://rhiyaprinters-admin.vercel.app', 'https://www.rhiyaprinters.ca'];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps, curl, postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Error:', err));

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Product routes
app.use('/api/products', productRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/ads', adVideoRoutes);
app.use('/api/email', emailRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

