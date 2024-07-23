// BookCard.jsx

import { Link } from 'react-router-dom'; // Import Link component from react-router-dom for navigation
import "../css/BookCard.css"; // Import the CSS file for styling the BookCard component

export const BookCard = ({ book, role }) => { // Define and export a functional component named BookCard that accepts book and role as props
    const { name, author, imageUrl, _id } = book; // Destructure the book object to extract name, author, imageUrl, and _id (unique identifier)

    return (
        <div className='book-card'> {/* Container for the book card with a specific CSS class for styling */}
            <img src={imageUrl} alt={name} className='book-image' /> {/* Image of the book with src set to imageUrl and alt text set to the book name */}
            <div className="book-details"> {/* Container for the book details with a specific CSS class for styling */}
                <h3>{name}</h3> {/* Display the book name in an h3 element */}
                <p>{author}</p> {/* Display the author name in a paragraph element */}
            </div>
            {role === "admin" && <div className="book-actions"> {/* Conditionally render the book-actions div if the role is admin */}
                <button>
                    <Link to={`/book/${_id}`} className='btn-link'>Edit</Link> {/* Link to the edit page for the book with the specific _id */}
                </button>
                <button>
                    <Link to={`/delete/${_id}`} className='btn-link'>Delete</Link> {/* Link to the delete page for the book with the specific _id */}
                </button>
            </div>}
        </div>
    );
};

/*
Explanation of each line:

1. import { Link } from 'react-router-dom';
   - Why: To use the Link component for navigation within the application.
   - What: Allows the user to navigate to different routes without refreshing the page.
   - Where: Imported from the react-router-dom library.

2. import "../css/BookCard.css";
   - Why: To apply specific styles to the BookCard component.
   - What: Imports the CSS file containing styles for the BookCard component.
   - Where: Imported from the local CSS file located in the css directory.

3. export const BookCard = ({ book, role }) => {
   - Why: To create and export a functional component named BookCard.
   - What: Defines the BookCard component which takes book and role as props.
   - Where: The component is defined in this file and will be used elsewhere in the application.

4. const { name, author, imageUrl, _id } = book;
   - Why: To extract specific properties from the book object for easier use in the JSX.
   - What: Destructures the book object to get the name, author, imageUrl, and _id properties.
   - Where: This is done within the BookCard component.

5. <div className='book-card'>
   - Why: To create a container for the book card with a specific class for styling.
   - What: Defines a div element with the class name book-card.
   - Where: This is part of the JSX returned by the BookCard component.

6. <img src={imageUrl} alt={name} className='book-image' />
   - Why: To display the book's image.
   - What: Renders an img element with the source set to imageUrl and alt text set to the book name.
   - Where: Inside the book-card div.

7. <div className="book-details">
   - Why: To create a container for the book details with a specific class for styling.
   - What: Defines a div element with the class name book-details.
   - Where: Inside the book-card div.

8. <h3>{name}</h3>
   - Why: To display the book name.
   - What: Renders an h3 element containing the book name.
   - Where: Inside the book-details div.

9. <p>{author}</p>
   - Why: To display the author name.
   - What: Renders a p (paragraph) element containing the author name.
   - Where: Inside the book-details div.

10. {role === "admin" && <div className="book-actions">
    - Why: To conditionally render the book-actions div only if the user role is admin.
    - What: Checks if the role prop is equal to "admin" and if true, renders the div with class name book-actions.
    - Where: Inside the book-card div.

11. <button><Link to={`/book/${_id}`} className='btn-link'>Edit</Link></button>
    - Why: To provide an edit button that navigates to the edit page for the specific book.
    - What: Renders a button containing a Link component that navigates to the edit page for the book with the given _id.
    - Where: Inside the book-actions div.

12. <button><Link to={`/delete/${_id}`} className='btn-link'>Delete</Link></button>
    - Why: To provide a delete button that navigates to the delete page for the specific book.
    - What: Renders a button containing a Link component that navigates to the delete page for the book with the given _id.
    - Where: Inside the book-actions div.

13. export default BookCard;
    - Why: To allow the BookCard component to be imported and used in other parts of the application.
    - What: Exports the BookCard component as the default export from this file.
    - Where: At the end of the file.
*/
