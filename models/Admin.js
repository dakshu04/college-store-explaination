import mongoose from "mongoose"; // Import mongoose to interact with MongoDB

// Define a schema for the admin model
const adminSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, // Ensures that the 'username' field is provided (validation rule)
        unique: true // Ensures that 'username' value is unique across the collection (constraint)
    },
    password: { 
        type: String, 
        required: true // Ensures that the 'password' field is provided (validation rule)
    }
});

// Create a model based on the schema
const adminModel = mongoose.model('Admin', adminSchema); // Create a Mongoose model named 'Admin' using the schema

export { adminModel as Admin }; // Export the model as 'Admin' for use in other parts of the application

// Explanation of Terms and Concepts:

// mongoose:
// Why: To interact with MongoDB using an ODM (Object Data Modeling) library.
// What: A library for MongoDB that provides schema-based modeling, validation, and more.
// Where: Imported at the top to define schemas and interact with MongoDB.

// Schema:
// Why: To define the structure and constraints of documents in a MongoDB collection.
// What: An object defining the structure, types, and constraints of data stored in a MongoDB collection.
// Where: Used here to define the structure of the 'Admin' documents.

// Model:
// Why: To create a representation of the data that can be used to interact with the MongoDB collection.
// What: A constructor function for creating and querying documents in a MongoDB collection.
// Where: Created using mongoose.model and exported for use in other parts of the application.

// Unique:
// Why: To ensure that the value of the field is unique across the collection.
// What: A constraint that prevents duplicate values in a field.
// Where: Applied to the 'username' field to ensure no two admins have the same username.

// Required:
// Why: To enforce that the field must be present in the document.
// What: A validation rule that ensures the field is not empty.
// Where: Applied to both 'username' and 'password' fields to ensure they are provided.
