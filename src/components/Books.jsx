// Books.jsx

import "../css/BookCard.css"; // Import the CSS file for styling the BookCard component
import { useEffect, useState } from "react"; // Import useEffect and useState hooks from React
import axios from "axios"; // Import axios for making HTTP requests
import { BookCard } from "./BookCard"; // Import the BookCard component

export const Books = ({ role }) => { // Define and export a functional component named Books that accepts role as a prop
  const [books, setBooks] = useState([]); // Define a state variable books initialized as an empty array

  useEffect(() => { // useEffect hook to perform side effects (fetch data) when the component mounts
    axios.get('http://localhost:3001/book/books') // Make a GET request to fetch books data
      .then(res => { // Handle the response from the GET request
        setBooks(res.data); // Update the state variable books with the data received from the response
        console.log(res.data); // Log the data to the console
      })
      .catch(err => console.log(err)); // Handle any errors that occur during the request
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="book-list"> {/* Container for the list of books with a specific CSS class for styling */}
      {
        books.map(book => ( // Map over the books array to render a BookCard for each book
          <BookCard key={book.id} book={book} role={role} /> // Render the BookCard component with a unique key and pass the book and role as props
        ))
      }
    </div>
  );
};

/*
Explanation of each line:

1. import "../css/BookCard.css";
   - Why: To apply specific styles to the BookCard component.
   - What: Imports the CSS file containing styles for the BookCard component.
   - Where: Imported from the local CSS file located in the css directory.

2. import { useEffect, useState } from "react";
   - Why: To use React hooks for managing state and side effects.
   - What: Imports the useEffect and useState hooks from React.
   - Where: Imported from the react library.

3. import axios from "axios";
   - Why: To make HTTP requests to fetch data from the server.
   - What: Imports the axios library for making HTTP requests.
   - Where: Imported from the axios package.

4. import { BookCard } from "./BookCard";
   - Why: To use the BookCard component for rendering individual book cards.
   - What: Imports the BookCard component.
   - Where: Imported from the local BookCard file.

5. export const Books = ({ role }) => {
   - Why: To create and export a functional component named Books.
   - What: Defines the Books component which takes role as a prop.
   - Where: The component is defined in this file and will be used elsewhere in the application.

6. const [books, setBooks] = useState([]);
   - Why: To manage the state of the books array.
   - What: Defines a state variable books initialized as an empty array, and setBooks to update it.
   - Where: This is done within the Books component.

7. useEffect(() => {
   - Why: To perform side effects such as fetching data when the component mounts.
   - What: Defines an effect that runs when the component mounts.
   - Where: Inside the Books component.

8. axios.get('http://localhost:3001/book/books')
   - Why: To fetch the list of books from the server.
   - What: Makes a GET request to the specified URL to retrieve the books data.
   - Where: Inside the useEffect hook.

9. .then(res => {
   - Why: To handle the response from the GET request.
   - What: Processes the response from the server.
   - Where: Chained to the axios GET request.

10. setBooks(res.data);
    - Why: To update the state with the data received from the server.
    - What: Updates the books state variable with the received data.
    - Where: Inside the then block.

11. console.log(res.data);
    - Why: To log the received data to the console for debugging purposes.
    - What: Logs the data to the console.
    - Where: Inside the then block.

12. .catch(err => console.log(err));
    - Why: To handle any errors that occur during the request.
    - What: Logs any errors to the console.
    - Where: Chained to the axios GET request.

13. }, []);
    - Why: To ensure the useEffect hook runs only once when the component mounts.
    - What: Specifies an empty dependency array for the useEffect hook.
    - Where: Inside the useEffect hook.

14. <div className="book-list">
    - Why: To create a container for the list of books with a specific class for styling.
    - What: Defines a div element with the class name book-list.
    - Where: This is part of the JSX returned by the Books component.

15. {
      books.map(book => (
        <BookCard key={book.id} book={book} role={role} />
      ))
    }
    - Why: To render a list of BookCard components for each book.
    - What: Maps over the books array and renders a BookCard component for each book with a unique key and passes the book and role as props.
    - Where: Inside the book-list div.
*/
