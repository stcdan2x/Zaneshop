import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import users from "./data/users.js";
import products from "./data/products.js";

dotenv.config();

connectDB();

const importData = async () => {
   try{
      await User.deleteMany();
      await Product.deleteMany();
      await Order.deleteMany();

      const createdUsers = await User.insertMany(users);

      const adminUser = createdUsers[0]._id;

      const sampleProducts = products.map( product => {
         return { ...product, user: adminUser };
      })

      await Product.insertMany(sampleProducts);

      console.log("Data Import Succesful.");
      process.exit();
   }catch (err) {
      console.error(`${err}`);
      process.exit(1)
   }
};

const deleteData = async () => {
   try{
      await User.deleteMany();
      await Product.deleteMany();
      await Order.deleteMany();

      console.log("Data Deleted.");
      process.exit();
   }catch (err) {
      console.error(`${err}`);
      process.exit(1)
   }
};

if (process.argv[2] === "-d") {
   deleteData();
} else {
   importData();
}