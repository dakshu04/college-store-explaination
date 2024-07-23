import express from 'express'; 
// Why: To create and manage HTTP routes and handle requests and responses in the server (not used in this script but often included for complete server setup)
// What: A web application framework for Node.js.
// Where: Imported at the top to potentially define routes and middleware (though not used in this specific script).

import bcrypt from 'bcrypt'; 
// Why: To hash passwords securely.
// What: A library for hashing passwords and comparing hashed passwords.
// Where: Imported at the top to hash the default admin password securely.

import { Admin } from './models/Admin.js'; 
// Why: To interact with the Admin MongoDB collection.
// What: A Mongoose model representing an admin document.
// Where: Imported from `./models/Admin.js` to perform operations related to admin accounts.

import './db.js'; 
// Why: To set up the database connection.
// What: A module that contains the code to connect to MongoDB.
// Where: Imported to ensure that the database connection is established before running the script.

async function AdminAccount() { 
// Define an asynchronous function to set up the Admin account
// Why: To handle asynchronous operations of counting documents, hashing passwords, and saving documents.
// What: An async function that executes operations and waits for them to complete.
    try {
        const adminCount = await Admin.countDocuments(); 
        // Why: To check the number of admin documents in the collection.
// What: Counts the number of documents in the Admin collection to determine if an admin account already exists.
// Where: Called to check if the admin account needs to be created.

        if (adminCount === 0) { 
            // Why: To create a new admin account only if none exists.
            // What: Checks if there are no existing admin accounts.
            // Where: Conditional check to determine if a new admin account should be created.

            const hashPassword = await bcrypt.hash('adminpassword', 10); 
            // Why: To hash the default admin password for security.
            // What: Generates a hashed version of the password with a salt round of 10 for added security.
            // Where: Used to securely hash the password before storing it in the database.

            const newAdmin = new Admin({ 
                username: 'admin', 
                password: hashPassword 
            });
            // Why: To create a new Admin document with the hashed password.
            // What: Constructs a new Admin document to be saved in the database.
            // Where: Used to create a new instance of the Admin model with the hashed password.

            await newAdmin.save(); 
            // Why: To save the new Admin document to the MongoDB collection.
            // What: Persists the document to the database.
            // Where: Called to save the newly created Admin document.

            console.log("Account created"); 
            // Why: To log a success message indicating the account was created.
            // What: Outputs a message to the console for confirmation.
            // Where: Used after successfully saving the Admin document.

        } else {
            console.log("Account already existed"); 
            // Why: To log a message indicating that an admin account already exists.
            // What: Outputs a message to the console if an admin account is already present.
            // Where: Used if the `adminCount` is not zero.

        }
    } catch (err) { 
        console.log(err); 
        // Why: To log any errors that occur during the process.
        // What: Outputs error details to the console for debugging.
        // Where: Used to catch and log errors from the try block.
    }
}

AdminAccount(); 
// Why: To execute the AdminAccount function.
// What: Calls the function to perform the account setup process.
// Where: Invoked at the end of the script to start the account creation process.
