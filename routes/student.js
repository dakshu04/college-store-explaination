import express from 'express'; // Import express to create and manage HTTP routes and handle requests
import { Student } from '../models/Student.js'; // Import the Student model to interact with the Student MongoDB collection
import bcrypt from 'bcrypt'; // Import bcrypt for hashing passwords
const router = express.Router(); // Create a new instance of express.Router for defining routes
import { verifyAdmin } from './auth.js'; // Import verifyAdmin middleware for authentication

// Route to register a new student (admin only)
router.post('/register', verifyAdmin, async (req, res) => {
    try {
        const { username, password, roll, grade } = req.body; // Extract student details from the request body
        
        // Check if a student with the same username already exists
        const student = await Student.findOne({ username });
        if (student) {
            return res.json({ message: "Student is already registered" }); // Respond with a message if student already exists
        }

        // Hash the password before storing it
        const hashPasswords = await bcrypt.hash(password, 10);

        // Create a new student instance
        const newStudent = new Student({
            username,
            password: hashPasswords, // Store the hashed password
            roll,
            grade
        });

        await newStudent.save(); // Save the new student to the database
        return res.json({ registered: true }); // Respond with a success message
    
    } catch (err) {
        return res.status(500).json({ message: "Error in registering student", error: err.message }); // Respond with error message
    }
});

export { router as studentRouter }; // Export the router as studentRouter for use in other parts of the application

// Explanation of Terms and Concepts:

// express:
// Why: To create and manage HTTP routes and handle requests and responses in the server.
// What: A web application framework for Node.js.
// Where: Imported at the top to define routes and middleware.

// Student:
// Why: To interact with the Student MongoDB collection.
// What: A Mongoose model representing a student document.
// Where: Imported from '../models/Student.js' to perform database operations.

// bcrypt:
// Why: To hash passwords and securely store them in the database.
// What: A library for hashing and comparing passwords.
// Where: Imported at the top for password encryption.

// verifyAdmin:
// Why: To ensure that only authenticated admin users can register students.
// What: A middleware function used to verify admin authentication.
// Where: Imported from './auth.js' and used in the '/register' route.

// Router:
// Why: To handle routing and middleware in an Express application.
// What: An instance of Express's router to define routes and middleware.
// Where: Created using express.Router() to define route handlers.

// Middleware:
// Why: To perform operations like authentication and authorization before reaching route handlers.
// What: Functions that execute during the request-response cycle.
// Where: verifyAdmin is used as middleware for the '/register' route to ensure only admins can register students.

// Error Handling:
// Why: To manage and respond to errors that occur during request processing.
// What: Mechanisms for logging and responding with error messages.
// Where: Used in try-catch blocks and error responses in route handlers.
