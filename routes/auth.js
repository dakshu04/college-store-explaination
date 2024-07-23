import express from 'express'; // Import express to create and manage HTTP routes and handle requests
import { Admin } from '../models/Admin.js'; // Import the Admin model to interact with the Admin MongoDB collection
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for creating and verifying JSON Web Tokens
import bcrypt from 'bcrypt'; // Import bcrypt for hashing and comparing passwords
import { Student } from '../models/Student.js'; // Import the Student model to interact with the Student MongoDB collection

const router = express.Router(); // Create a new instance of express.Router for defining routes

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body; // Extract username, password, and role from the request body

        if (role === 'admin') { // Check if the role is 'admin'
            const admin = await Admin.findOne({ username }); // Find the admin by username
            if (!admin) {
                return res.status(404).json({ message: "Admin not registered" }); // Return error if admin not found
            }

            const validPassword = await bcrypt.compare(password, admin.password); // Compare the provided password with the stored hashed password
            if (!validPassword) {
                return res.status(401).json({ message: "Wrong password" }); // Return error if password is incorrect
            }

            const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_Key); // Create a JWT token for the admin
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Set the token in a cookie
            return res.json({ login: true, role: 'admin' }); // Respond with login success and role

        } else if (role === 'student') { // Check if the role is 'student'
            const student = await Student.findOne({ username }); // Find the student by username
            if (!student) {
                return res.status(404).json({ message: "Student not registered" }); // Return error if student not found
            }

            const validPassword = await bcrypt.compare(password, student.password); // Compare the provided password with the stored hashed password
            if (!validPassword) {
                return res.status(401).json({ message: "Wrong password" }); // Return error if password is incorrect
            }

            const token = jwt.sign({ username: student.username, role: 'student' }, process.env.Student_Key); // Create a JWT token for the student
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Set the token in a cookie
            return res.json({ login: true, role: 'student' }); // Respond with login success and role

        } else {
            return res.status(400).json({ message: "Invalid role" }); // Return error if role is invalid
        }

    } catch (err) {
        console.error('Error during login:', err); // Log the error on the server
        return res.status(500).json({ message: "Internal server error", error: err.message }); // Respond with a server error message
    }
});

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token; // Retrieve the token from cookies
    if (!token) {
        return res.status(401).json({ message: "Invalid Admin" }); // Return error if no token is provided
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => { // Verify the token with Admin_Key
            if (err) {
                return res.status(403).json({ message: "Invalid token" }); // Return error if token is invalid
            } else {
                req.username = decoded.username; // Attach the decoded username to the request
                req.role = decoded.role; // Attach the decoded role to the request
                next(); // Proceed to the next middleware or route handler
            }
        });
    }
};

// Middleware to verify user (either admin or student)
const verifyUser = (req, res, next) => {
    const token = req.cookies.token; // Retrieve the token from cookies

    if (!token) {
        return res.status(401).json({ message: "No token is provided" }); // Return error if no token is provided
    }

    // First, try to verify with Admin_Key
    jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
        if (err) {
            // If verification fails, try with Student_Key
            jwt.verify(token, process.env.Student_Key, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid token" }); // Return error if token is invalid
                } else {
                    // Token verified with Student_Key
                    req.username = decoded.username; // Attach the decoded username to the request
                    req.role = decoded.role; // Attach the decoded role to the request
                    next(); // Proceed to the next middleware or route handler
                }
            });
        } else {
            // Token verified with Admin_Key
            req.username = decoded.username; // Attach the decoded username to the request
            req.role = decoded.role; // Attach the decoded role to the request
            next(); // Proceed to the next middleware or route handler
        }
    });
};

router.get('/verify', verifyUser, (req, res) => {
    return res.json({ login: true, role: req.role }); // Respond with login status and role
});

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    return res.json({ logout: true }); // Respond with logout success
});

export { router as AdminRouter, verifyAdmin }; // Export the router as AdminRouter and the verifyAdmin middleware for use in other parts of the application

// Explanation of Terms and Concepts:

// express:
// Why: To create and manage HTTP routes and handle requests and responses in the server.
// What: A web application framework for Node.js.
// Where: Imported at the top to define routes and middleware.

// Admin:
// Why: To interact with the Admin MongoDB collection.
// What: A Mongoose model representing an admin document.
// Where: Imported from '../models/Admin.js' to perform database operations.

// jwt (jsonwebtoken):
// Why: To create and verify JSON Web Tokens for user authentication.
// What: A library for generating and validating JWTs.
// Where: Imported at the top to handle token creation and verification.

// bcrypt:
// Why: To hash passwords and compare hashed passwords for authentication.
// What: A library for hashing and comparing passwords.
// Where: Imported at the top for password encryption and validation.

// Student:
// Why: To interact with the Student MongoDB collection.
// What: A Mongoose model representing a student document.
// Where: Imported from '../models/Student.js' to perform database operations.

// Router:
// Why: To handle routing and middleware in an Express application.
// What: An instance of Express's router to define routes and middleware.
// Where: Created using express.Router() to define route handlers.

// Middleware:
// Why: To perform operations like authentication and authorization before reaching route handlers.
// What: Functions that execute during the request-response cycle.
// Where: verifyAdmin and verifyUser are middleware functions used for authentication and authorization.

// Token:
// Why: To securely identify and authenticate users across requests.
// What: A JSON Web Token used for managing user sessions.
// Where: Created and managed using jsonwebtoken, and stored in cookies for client-server communication.

// Cookie:
// Why: To store the token securely on the client-side.
// What: A small piece of data stored in the browser and sent with each request.
// Where: Managed using res.cookie() and res.clearCookie() to handle authentication tokens.

// Error Handling:
// Why: To manage and respond to errors that occur during request processing.
// What: Mechanisms for logging and responding with error messages.
// Where: Used in try-catch blocks and error responses in route handlers.
