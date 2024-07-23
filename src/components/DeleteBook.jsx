import { useNavigate, useParams } from 'react-router-dom'; // Import hooks for navigation and route parameters from react-router-dom
import { useEffect } from 'react'; // Import useEffect hook from React for side effects
import axios from 'axios'; // Import axios for making HTTP requests

export const DeleteBook = () => { // Define and export a functional component named DeleteBook
    const navigate = useNavigate(); // Initialize the navigate function for programmatic navigation
    const { id } = useParams(); // Extract the book ID from the route parameters

    useEffect(() => { // useEffect hook to perform side effects (delete book) when the component mounts
        // Use DELETE method to delete the book
        axios.delete('http://localhost:3001/book/book/' + id) // Make a DELETE request to the server with the book ID
            .then(res => { // Handle the response from the DELETE request
                if (res.data.deleted) { // Check if the deletion was successful
                    navigate('/books'); // Navigate to the books page if deletion was successful
                }
            })
            .catch(err => console.log(err)); // Handle any errors that occur during the request
    }, [id, navigate]); // Dependency array ensures the effect runs when the id or navigate changes

    return null; // This component does not render anything
};

/*
Explanation of each line:

1. import { useNavigate, useParams } from 'react-router-dom';
   - Why: To use navigation and route parameters in the component.
   - What: Imports useNavigate for programmatic navigation and useParams to access route parameters.
   - Where: Imported from the react-router-dom library.

2. import { useEffect } from 'react';
   - Why: To use the useEffect hook for performing side effects.
   - What: Imports the useEffect hook from React.
   - Where: Imported from the react library.

3. import axios from 'axios';
   - Why: To make HTTP requests for deleting the book.
   - What: Imports the axios library for making HTTP requests.
   - Where: Imported from the axios package.

4. export const DeleteBook = () => {
   - Why: To create and export a functional component named DeleteBook.
   - What: Defines the DeleteBook component.
   - Where: The component is defined in this file and will be used elsewhere in the application.

5. const navigate = useNavigate();
   - Why: To use the navigate function for programmatic navigation.
   - What: Initializes the navigate function for use in the component.
   - Where: Inside the DeleteBook component.

6. const { id } = useParams();
   - Why: To extract the book ID from the route parameters.
   - What: Destructures the id parameter from the URL.
   - Where: Inside the DeleteBook component.

7. useEffect(() => {
   - Why: To perform side effects such as making an HTTP request when the component mounts.
   - What: Defines an effect that runs when the component mounts or when dependencies change.
   - Where: Inside the DeleteBook component.

8. axios.delete('http://localhost:3001/book/book/' + id)
   - Why: To send a DELETE request to remove the book from the server.
   - What: Makes a DELETE request to the specified URL with the book ID.
   - Where: Inside the useEffect hook.

9. .then(res => {
   - Why: To handle the response from the DELETE request.
   - What: Processes the server's response.
   - Where: Chained to the axios DELETE request.

10. if (res.data.deleted) {
    - Why: To check if the deletion was successful.
    - What: Evaluates the condition to check if the response indicates successful deletion.
    - Where: Inside the then block.

11. navigate('/books');
    - Why: To navigate to the books page after successful deletion.
    - What: Uses the navigate function to redirect the user to the books page.
    - Where: Inside the if block.

12. .catch(err => console.log(err));
    - Why: To handle any errors that occur during the DELETE request.
    - What: Logs any errors to the console.
    - Where: Chained to the axios DELETE request.

13. }, [id, navigate]);
    - Why: To specify dependencies that trigger the effect when they change.
    - What: Ensures the effect runs when id or navigate changes.
    - Where: Inside the useEffect hook.

14. return null;
    - Why: This component does not render anything.
    - What: Returns null as this component is only responsible for performing an action (deletion) and does not have a visual output.
    - Where: Inside the DeleteBook component.
*/ 
