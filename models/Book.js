import mongoose from "mongoose"; // Import mongoose to interact with MongoDB

// Define a schema for the book model
const bookSchema = new mongoose.Schema({
    name: { 
        type: String // Defines the 'name' field as a string
    },
    author: { 
        type: String, 
        required: true // Ensures that the 'author' field is provided (validation rule)
    },
    imageUrl: { 
        type: String, 
        required: true // Ensures that the 'imageUrl' field is provided (validation rule)
    }
});

// Create a model based on the schema
const bookModel = mongoose.model('Book', bookSchema); // Create a Mongoose model named 'Book' using the schema

export { bookModel as Book }; // Export the model as 'Book' for use in other parts of the application

// Explanation of Terms and Concepts:

// mongoose:
// Why: To interact with MongoDB using an ODM (Object Data Modeling) library.
// What: A library for MongoDB that provides schema-based modeling, validation, and more.
// Where: Imported at the top to define schemas and interact with MongoDB.

// Schema:
// Why: To define the structure and constraints of documents in a MongoDB collection.
// What: An object defining the structure, types, and constraints of data stored in a MongoDB collection.
// Where: Used here to define the structure of the 'Book' documents.

// Model:
// Why: To create a representation of the data that can be used to interact with the MongoDB collection.
// What: A constructor function for creating and querying documents in a MongoDB collection.
// Where: Created using mongoose.model and exported for use in other parts of the application.

// Required:
// Why: To enforce that the field must be present in the document.
// What: A validation rule that ensures the field is not empty.
// Where: Applied to the 'author' and 'imageUrl' fields to ensure they are provided.
