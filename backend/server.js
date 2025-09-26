import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/userModel.js';
import cors from 'cors';
import Product from './models/productModel.js';
import jwt from "jsonwebtoken";
// import protect from "./middleware/authMiddleware.js";
import authUser from './middleware/authUser.js';

dotenv.config();
const app = express();
app.use(express.json());



const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('database conneted');
  })
  await mongoose.connect(process.env.MONGODB_URI);
}
connectDB();



const allowedOrigins = ["http://localhost:5173", "https://login-mern-aspire-frontend.vercel.app"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or non-browser requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'CORS policy does not allow access from this origin';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));



app.get('/', (req, res) => {
  res.send('server is running')
})

app.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const exist = await User.findOne({ userName });

    if (!userName) {
      return res.status(400).json({ success: false, message: "enter email" });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: "enter password" });
    }

    if (!exist) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (exist.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    let token = jwt.sign({id:exist._id, username: exist.userName}, process.env.JWT_SECRET, { expiresIn: "1d" } );

    return res.status(200).json({ token });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


app.get('/profile', authUser, async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user._id });

    const user = req.user.toObject(); 

    res.status(200).json({
      id: user._id,
      userName: user.userName, 
      products
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error in profile page." });
  }
});











app.get('/allproducts', async (req, res)=>{
  try {

    const products = await Product.find();

    res.status(200).json({products});
    
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ message: "Server error in all products route." });
  }
})




app.post('/add-product', authUser, async (req, res)=>{
try {

    const { name, price, description } = req.body;

    if(!name || !price){
      return res.status(401).json({ message: "name and price are required to add a product." });
    }

    if(price <= 0 ){
      return res.status(401).json({ message: "price should be more than zero." });
    }

    let newProduct = await Product.create({
      name,
      price,
      description,
      owner: req.user._id,
    });

    await newProduct.save();
res.status(201).json({ message: "Product added successfully", product: newProduct });
alert('product added successfully');
    
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ message: "Server error in add product route." });
  }
} )

app.put('/edit-product/:id', authUser, async (req, res)=>{
  try {
    const product = await Product.findById(req.params.id);

    if(!product){
       return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, description } = req.body;

    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    
if (name !== undefined) product.name = name;
if (price !== undefined) product.price = price;
if (description !== undefined) product.description = description;


    await product.save();
    res.json({product});
    
   
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error in edit product route." });
  }
} )





app.delete("/delete-product/:id", authUser, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

   
    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error in delete product" });
  }
});







app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on ${process.env.PORT || 5000}`);
});





