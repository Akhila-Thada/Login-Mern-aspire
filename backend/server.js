import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/userModel.js';
import cors from 'cors';

const app = express();


app.use(express.json());

dotenv.config();

const allowedOrign = ["http://localhost:5173"]




const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('database conneted');
    })

    await mongoose.connect(process.env.MONGODB_URI);

}

connectDB();


const allowedOrigins = ["http://localhost:5173"];



app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow Postman or non-browser requests
    if(allowedOrigins.indexOf(origin) === -1){
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

    if (!exist) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (exist.password !== password) { 
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

   
    return res.status(200).json({exist});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});





app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on ${process.env.PORT || 3000}`);
});
