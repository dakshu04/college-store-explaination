import mongoose from 'mongoose'; // Import mongoose to interact with MongoDB
import dotenv from 'dotenv'; // Import dotenv to manage environment variables

dotenv.config(); // Load environment variables from a .env file into process.env

// Function to establish a connection to MongoDB
const Connection = async () => {
    try {
        // Attempt to connect to MongoDB using the URL from environment variables
        await mongoose.connect(process.env.URL);
        console.log("Connected"); // Log success message to the console
        console.log("Connected to MongoDB"); // Log additional success message
    } catch (err) {
        // Log error message if connection fails
        console.error("Error connecting to MongoDB:", err);
    }
}

Connection(); // Call the function to initiate the connection to MongoDB

// Explanation of Terms and Concepts:

// mongoose:
// Why: To interact with MongoDB using an ODM (Object Data Modeling) library.
// What: A library for MongoDB that provides schema-based modeling, validation, and more.
// Where: Imported at the top to define schemas and interact with MongoDB.

// dotenv:
// Why: To manage and use environment variables in the application.
// What: A module that loads environment variables from a .env file into process.env.
// Where: Imported at the top and used to configure environment variables.

// async/await:
// Why: To handle asynchronous operations in a more readable way.
// What: Syntax for working with asynchronous code, where 'async' defines a function that returns a promise, and 'await' pauses execution until the promise resolves.
// Where: Used in the Connection function to handle the asynchronous connection process.

// process.env:
// Why: To access environment variables in Node.js.
// What: An object that contains environment variables as key-value pairs.
// Where: Used to get the MongoDB connection URL from environment variables.

// try/catch:
// Why: To handle errors that might occur during asynchronous operations.
// What: A block of code that attempts to execute a block of code and catches errors if they occur.
// Where: Used to catch and log errors if the connection to MongoDB fails.

// console.log:
// Why: To output messages to the console for debugging or informational purposes.
// What: A method that writes messages to the standard output (console).
// Where: Used to log connection success and error messages.
