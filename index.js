import express from 'express'; // Import express to create and manage HTTP routes and handle requests and responses in the server
import dotenv from 'dotenv'; // Import dotenv to manage and use environment variables in the application
import cors from 'cors'; // Import cors to enable Cross-Origin Resource Sharing (CORS) and allow requests from different origins
import cookieParser from 'cookie-parser'; // Import cookie-parser to parse cookies sent with requests
import { AdminRouter } from './routes/auth.js'; // Import router for authentication-related routes
import './db.js'; // Import and execute the database connection setup
import { studentRouter } from './routes/student.js'; // Import router for student-related routes
import { bookRouter } from './routes/book.js'; // Import router for book-related routes
import { Book } from './models/Book.js'; // Import Book model to interact with the Book collection
import { Student } from './models/Student.js'; // Import Student model to interact with the Student collection
import { Admin } from './models/Admin.js'; // Import Admin model to interact with the Admin collection
import { ok } from 'assert'; // Import assert module for assertion testing (not used in this code)

// Load environment variables as early as possible
dotenv.config(); // Load environment variables from .env file into process.env

const app = express(); // Create an Express application instance

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors({
    origin: ['http://localhost:5173'], // Allow requests from this origin
    credentials: true // Enable credentials (cookies) to be sent with requests
}));
app.use(cookieParser()); // Parse cookies from requests

// Routes
app.use('/auth', AdminRouter); // Use AdminRouter for authentication routes
app.use('/student', studentRouter); // Use studentRouter for student-related routes
app.use('/book', bookRouter); // Use bookRouter for book-related routes

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack to the console
    res.status(500).send('Something broke!'); // Send a 500 Internal Server Error response
});

// Dashboard route
app.get('/dashboard', async (req, res) => {
    try {
        // Fetch counts of documents in Student, Admin, and Book collections
        const student = await Student.countDocuments(); // Get the count of students
        const admin = await Admin.countDocuments(); // Get the count of admins
        const book = await Book.countDocuments(); // Get the count of books
        // Send JSON response with counts
        return res.json({ ok: true, student, book, admin });
    } catch (err) {
        // Handle errors and send error response
        return res.json(err);
    }
});

const PORT = process.env.PORT || 3001; // Set port from environment variable or default to 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log message when server starts
});

// Explanation of Terms and Concepts:
// express:
// Why: To create and manage HTTP routes and handle requests and responses in the server.
// What: A web application framework for Node.js.
// Where: Imported at the top to define and manage routes and middleware.

// dotenv:
// Why: To manage and use environment variables in the application.
// What: A module that loads environment variables from a .env file into process.env.
// Where: Imported and used at the top to configure environment variables.

// cors:
// Why: To enable Cross-Origin Resource Sharing (CORS) and allow requests from different origins.
// What: A module to manage CORS settings.
// Where: Imported and used to configure CORS settings for the application.

// cookie-parser:
// Why: To parse cookies sent with requests.
// What: A middleware to handle cookies in requests.
// Where: Imported and used to parse cookies from requests.

// AdminRouter, studentRouter, bookRouter:
// Why: To handle routing for different parts of the application (authentication, student-related, and book-related routes).
// What: Router modules that define routes and handlers for different functionalities.
// Where: Imported from their respective route files.

// dotenv.config():
// Why: To load environment variables from a .env file into process.env.
// What: A method call that reads environment variables and adds them to the process environment.
// Where: Used at the beginning to ensure environment variables are available throughout the application.

// express.json():
// Why: To parse incoming JSON requests.
// What: Middleware that parses JSON request bodies into JavaScript objects.
// Where: Used to process JSON payloads in incoming requests.

// cors():
// Why: To enable and configure CORS for the application.
// What: Middleware that allows cross-origin requests from specified origins.
// Where: Configured to allow requests from http://localhost:5173 and to include credentials.

// cookieParser():
// Why: To parse cookies from requests.
// What: Middleware that extracts cookies from request headers.
// Where: Used to enable cookie parsing in the application.

// app.use():
// Why: To set up middleware functions and route handlers for the application.
// What: Method to specify middleware and route handling functions.
// Where: Used to apply middleware and routes to the application.

// app.get('/dashboard'):
// Why: To provide an overview of counts of documents in different collections.
// What: A route handler that responds with counts of students, admins, and books.
// Where: Defined in the /dashboard route handler.

// app.listen(PORT, callback):
// Why: To start the server and listen for incoming requests on a specified port.
// What: A method that starts the server and logs a message when it’s running.
// Where: Used at the end to start the server on the specified port.