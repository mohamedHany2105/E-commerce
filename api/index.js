import mongoose from "mongoose";
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import productRouter from './routes/product.route.js'
dotenv.config();

// app defination

const app = express();

// middlewares

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 
app.get('/',(req,res)=>{
  res.send("halslslslslslsls")
})


// routes
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/product',productRouter)

// mongoose connection & app listening
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongodb ");
  app.listen(process.env.PORT_NUMBER, () => {
    console.log(
      `app listening to : http://localhost:${process.env.PORT_NUMBER}`
    );
  });
});

// error handling

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'internal server error';

  res.status(statusCode).json({ 
    success: false,
    statusCode,
    message,
  });
  next()
});
