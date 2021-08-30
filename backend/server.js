import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routers/productRouter.js";
import { errorHandler, handleNotFound } from "./middleware/errorMiddleware.js";



dotenv.config();
connectDB();

const app = express()

app.get("/", ( req, res ) => {
   res.send("API is active!");
});

app.use("/api/products", productRouter);

//mw to add custom error handler for requests for unrecognized routes
app.use(handleNotFound);

//mw to add custom error handler for all other requests and send a corresponding error message
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));