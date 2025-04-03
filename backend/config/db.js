import mongoose from "mongoose"; //For database operations.  

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); //Using async/await to connect to the MongoDB database using the MONGO_URI env variable.
        console.log(`MongoDB Connected: ${conn.connection.host}`); // If the connection is successful, we log a message to the console. 
    } catch (error) { 
        console.error(`Error: ${error.message}`);// If there's an error, we log the error message...
        process.exit(1); // ...and exit the process with a status code of 1.
    }
};

export default connectDB;

