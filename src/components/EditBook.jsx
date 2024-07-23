import { useEffect, useState } from 'react'; // Import React hooks: useState for state management and useEffect for side effects
import "../css/AddStudent.css"; // Import CSS stylesheet for component styling
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate, useParams } from 'react-router-dom'; // Import hooks for navigation and route parameters from react-router-dom

const EditBook = () => { // Define and export a functional component named EditBook
    // Define state variables using useState hook
    const [name, setName] = useState(''); // State variable to manage the book name, initialized to an empty string
    const [author, setAuthor] = useState(''); // State variable to manage the author's name, initialized to an empty string
    const [imageUrl, setImageUrl] = useState(''); // State variable to manage the image URL, initialized to an empty string
    const navigate = useNavigate(); // Initialize navigate function for programmatic navigation
    const { id } = useParams(); // Extract the book ID from the route parameters

    // Fetch book data on component mount using useEffect hook
    useEffect(() => {
        axios.get(`http://localhost:3001/book/book/` + id) // Make a GET request to fetch book details by ID
            .then(res => {
                console.log(res); // Log the response data for debugging
                // Set the fetched data to state variables here (e.g., setName(res.data.name))
            })
            .catch(err => console.log('Axios error is', err)); // Log any errors that occur during the request
    }, [id]); // Dependency array ensures the effect runs when the id changes

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        axios.put(`http://localhost:3001/book/book/${id}`, { name, author, imageUrl }, { withCredentials: true }) // Make a PUT request to update the book details
            .then(res => {
                if (res.data.updated) { // Check if the update was successful
                    navigate('/books'); // Navigate to the books page if the update was successful
                } else {
                    console.log(res); // Log the response if update was not successful
                }
            })
            .catch(err => console.log('Axios error is', err)); // Log any errors that occur during the request
    };

    return (
        <div>
            <div className='student-form-container'>
                <form className='student-form' onSubmit={handleSubmit}> {/* Attach handleSubmit function to form submission */}
                    <h2>Edit Book</h2> {/* Form title */}
                    <div className='form-group'> {/* Container for form field */}
                        <label htmlFor="book">Book Name:</label> {/* Label for the book name input */}
                        <input type="text" id='book' name='book' value={name} // Input field for book name, value bound to state variable
                            onChange={(e) => setName(e.target.value)} /> {/* Update state when input changes */}
                    </div>

                    <div className='form-group'> {/* Container for form field */}
                        <label htmlFor="author">Author Name:</label> {/* Label for the author name input */}
                        <input type="text" id='author' name='author' value={author} // Input field for author's name, value bound to state variable
                            onChange={(e) => setAuthor(e.target.value)} /> {/* Update state when input changes */}
                    </div>

                    <div className='form-group'> {/* Container for form field */}
                        <label htmlFor="image">Image URL:</label> {/* Label for the image URL input */}
                        <input type="text" id='image' name='image' value={imageUrl} // Input field for image URL, value bound to state variable
                            onChange={(e) => setImageUrl(e.target.value)} /> {/* Update state when input changes */}
                    </div>

                    <button type='submit'>Update</button> {/* Submit button for the form */}
                </form>
            </div>
        </div>
    );
}

export default EditBook; // Export the component for use in other parts of the application

/*
Explanation of terms and concepts:

1. useState
   - Why: To manage state in functional components.
   - What: A hook that allows you to add state to functional components.
   - Where: Used to create state variables like `name`, `author`, and `imageUrl`.

2. useEffect
   - Why: To handle side effects in functional components, such as fetching data.
   - What: A hook that performs side effects (e.g., data fetching) after the component renders.
   - Where: Used to fetch book data when the component mounts.

3. useNavigate
   - Why: To programmatically navigate to different routes.
   - What: A hook that provides a function to navigate to different paths.
   - Where: Used to navigate to the books page after updating a book.

4. useParams
   - Why: To access route parameters in a component.
   - What: A hook that provides route parameters from the URL.
   - Where: Used to extract the book ID from the URL.

5. axios
   - Why: To make HTTP requests.
   - What: A library for making HTTP requests to a server.
   - Where: Used to perform GET and PUT requests to interact with the server.

6. e.preventDefault()
   - Why: To prevent the default form submission behavior.
   - What: Stops the form from reloading the page on submit.
   - Where: Inside the handleSubmit function.
*/ 
