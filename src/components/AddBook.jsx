import { useState } from 'react'; // Import useState hook from React to manage state within the component
import "../css/AddStudent.css"; // Import the CSS file for styling the component

import axios from 'axios'; // Import axios to handle HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom for navigation

const AddBook = () => { // Define a functional component named AddBook

    // State variables to store form input values
    const [name, setName] = useState(''); // useState hook to create a state variable for book name, initialized as an empty string
    const [author, setAuthor] = useState(''); // useState hook to create a state variable for author name, initialized as an empty string
    const [imageUrl, setImageUrl] = useState(''); // useState hook to create a state variable for image URL, initialized as an empty string

    const navigate = useNavigate(); // Initialize navigate function to programmatically navigate to different routes

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior (prevent page reload)

        // Use axios to send a POST request to add a new book
        axios.post('http://localhost:3001/book/add', { name, author, imageUrl }, { withCredentials: true })
            .then(res => { // Handle the response from the server
                if (res.data.added) { // Check if the book was successfully added
                    // Reset the input fields to empty strings
                    setName(''); // Reset the book name field
                    setAuthor(''); // Reset the author name field
                    setImageUrl(''); // Reset the image URL field
                    navigate('/books'); // Navigate to the '/books' route
                } else {
                    console.log(res); // Log the response if the book was not added successfully
                }
            })
            .catch(err => console.log('Axios error is', err)); // Log any errors that occur during the request
    };

    return (
        <div> {/* Parent container */}
            <div className='student-form-container'> {/* Container for the form with a specific CSS class for styling */}
                <form className='student-form' onSubmit={handleSubmit}> {/* Form element with an onSubmit handler */}
                    <h2>Add Book</h2> {/* Form heading */}
                    
                    <div className='form-group'> {/* Group for book name input */}
                        <label htmlFor="book">Book Name:</label> {/* Label for the book name input field */}
                        <input 
                            type="text" 
                            id='book' 
                            name='book' 
                            onChange={(e) => setName(e.target.value)} // Update the book name state when input changes
                        />
                    </div>

                    <div className='form-group'> {/* Group for author name input */}
                        <label htmlFor="author">Author Name:</label> {/* Label for the author name input field */}
                        <input 
                            type="text" 
                            id='author' 
                            name='author' 
                            onChange={(e) => setAuthor(e.target.value)} // Update the author name state when input changes
                        />
                    </div>

                    <div className='form-group'> {/* Group for image URL input */}
                        <label htmlFor="grade">Image URL:</label> {/* Label for the image URL input field */}
                        <input 
                            type="text" 
                            id='image' 
                            name='image' 
                            onChange={(e) => setImageUrl(e.target.value)} // Update the image URL state when input changes
                        />
                    </div>

                    <button type='submit'>Add</button> {/* Submit button to trigger form submission */}
                </form>
            </div>
        </div>
    );
}

export default AddBook; // Export the AddBook component as the default export
