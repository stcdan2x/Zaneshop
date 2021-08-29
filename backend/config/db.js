import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const connect = await mongoose
         .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            /* useCreateIndex: true, */
      });
      console.log(`Database Connected: ${connect.connection.host}`);
   } catch (error) {
      console.log(`Connection Error: ${error.message}`);
      process.exit(1);
   }
};

export default connectDB;