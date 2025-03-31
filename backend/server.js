import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json()); //allow accept json req.body

app.use("/api/product", productRoutes);
app.listen(5000, () => {
  connectDb();
  console.log("Server Started on http://localhost:5000");
});
