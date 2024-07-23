import express from 'express'; // Import express to create and manage HTTP routes and handle requests
import { Book } from '../models/Book.js'; // Import the Book model to interact with the Book MongoDB collection
import { verifyAdmin } from './auth.js'; // Import verifyAdmin middleware for authentication

const router = express.Router(); // Create a new instance of express.Router for defining routes

// Route to add a new book (admin only)
router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, author, imageUrl } = req.body; // Extract book details from the request body
        
        const newBook = new Book({ // Create a new book instance
            name,
            author,
            imageUrl
        });
        
        await newBook.save(); // Save the new book to the database
        return res.status(200).json({ added: true, message: 'Book added successfully' }); // Respond with success message
    
    } catch (err) {
        return res.status(500).json({ message: "Error in adding book", error: err.message }); // Respond with error message
    }
});

// Route to get all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find(); // Retrieve all books from the database
        return res.json(books); // Respond with the list of books
    
    } catch (err) {
        return res.status(500).json({ message: "Error fetching books", error: err.message }); // Respond with error message
    }
});

// Route to get a book by ID
router.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id; // Extract the book ID from the URL parameters
        const book = await Book.findById(id); // Find the book by its ID
        if (!book) {
            return res.status(404).json({ message: "Book not found" }); // Respond with error if book not found
        }
        return res.json(book); // Respond with the book details
    
    } catch (err) {
        return res.status(500).json({ message: "Error fetching book", error: err.message }); // Respond with error message
    }
});

// Route to update a book by ID
router.put('/book/:id', async (req, res) => {
    try {
        const id = req.params.id; // Extract the book ID from the URL parameters
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true }); // Update the book and return the updated document
        if (!book) {
            return res.status(404).json({ message: "Book not found" }); // Respond with error if book not found
        }
        return res.json({ updated: true, book }); // Respond with the updated book details
    
    } catch (err) {
        return res.status(500).json({ message: "Error updating book", error: err.message }); // Respond with error message
    }
});

// Route to delete a book by ID
router.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id; // Extract the book ID from the URL parameters
        const book = await Book.findByIdAndDelete(id); // Delete the book by its ID
        if (!book) {
            return res.status(404).json({ message: "Book not found" }); // Respond with error if book not found
        }
        return res.json({ deleted: true, book }); // Respond with the deleted book details
    
    } catch (err) {
        return res.status(500).json({ message: "Error deleting book", error: err.message }); // Respond with error message
    }
});

export { router as bookRouter }; // Export the router as bookRouter for use in other parts of the application

// Explanation of Terms and Concepts:

// express:
// Why: To create and manage HTTP routes and handle requests and responses in the server.
// What: A web application framework for Node.js.
// Where: Imported at the top to define routes and middleware.

// Book:
// Why: To interact with the Book MongoDB collection.
// What: A Mongoose model representing a book document.
// Where: Imported from '../models/Book.js' to perform database operations.

// verifyAdmin:
// Why: To ensure that only authenticated admin users can add books.
// What: A middleware function used to verify admin authentication.
// Where: Imported from './auth.js' and used in the '/add' route.

// Router:
// Why: To handle routing and middleware in an Express application.
// What: An instance of Express's router to define routes and middleware.
// Where: Created using express.Router() to define route handlers.

// Middleware:
// Why: To perform operations like authentication and authorization before reaching route handlers.
// What: Functions that execute during the request-response cycle.
// Where: verifyAdmin is used as middleware for the '/add' route to ensure only admins can add books.

// Error Handling:
// Why: To manage and respond to errors that occur during request processing.
// What: Mechanisms for logging and responding with error messages.
// Where: Used in try-catch blocks and error responses in route handlers.
