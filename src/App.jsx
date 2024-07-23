import { Home } from './components/Home'; // 1. Import the Home component from the components directory
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 2. Import routing components for client-side navigation
import { Navbar } from './components/Navbar'; // 3. Import the Navbar component to display navigation links
import { Books } from './components/Books'; // 4. Import the Books component to display the list of books
import { Login } from './components/Login'; // 5. Import the Login component for user authentication
import { Dashboard } from './components/Dashboard'; // 6. Import the Dashboard component for admin view
import AddStudent from './components/AddStudent'; // 7. Import the AddStudent component to add new students
import { useState } from 'react'; // 8. Import useState for managing local state within the App component
import { Logout } from './components/Logout'; // 9. Import the Logout component to handle user logout
import axios from "axios"; // 10. Import axios for making HTTP requests
import { useEffect } from 'react'; // 11. Import useEffect to perform side effects like fetching data
import AddBooks from './components/AddBook'; // 12. Import the AddBooks component to add new books
import EditBook from './components/EditBook'; // 13. Import the EditBook component to edit existing books
import { DeleteBook } from './components/DeleteBook'; // 14. Import the DeleteBook component to delete books

function App() {
  const [role, setRole] = useState(''); // 15. Define a state variable 'role' and its setter 'setRole' to manage user role

  useEffect(() => { // 16. useEffect hook to perform a side effect after component mounts
    axios.get('http://localhost:3001/auth/verify', { withCredentials: true }) // 17. Make a GET request to verify user authentication
      .then(res => { // 18. Handle successful response from the server
        if (res.data.login) { // 19. Check if the user is logged in
          setRole(res.data.role); // 20. Update the state with the user's role
        } else {
          setRole(''); // 21. Clear the role if the user is not logged in
        }
        console.log('Verification Response ', res); // 22. Log the response for debugging
      }).catch(err => { // 23. Handle any errors from the request
        console.log('Error during verification:', err.response ? err.response.data : err); // 24. Log error details
      });
  }, [setRole]); // 25. Dependency array with 'setRole', effect runs once after initial render

  return (
    <> {/* 26. Fragment wrapper to group multiple elements without adding extra nodes */}
      <BrowserRouter> {/* 27. Router component to enable client-side routing */}
        <Navbar role={role} /> {/* 28. Render the Navbar component with the current role as a prop */}
        <Routes> {/* 29. Define all the routes for the application */}
          <Route path="/" element={<Home />} /> {/* 30. Route for the home page */}
          <Route path="/books" element={<Books role={role} />} /> {/* 31. Route for the books page, passing role as prop */}
          <Route path="/login" element={<Login setRoleVar={setRole} />} /> {/* 32. Route for the login page, passing setRoleVar for updating role */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* 33. Route for the dashboard page */}
          <Route path="/addstudent" element={<AddStudent />} /> {/* 34. Route for the add student page */}
          <Route path="/logout" element={<Logout setRole={setRole} />} /> {/* 35. Route for the logout page, passing setRole for clearing role */}
          <Route path="/addbook" element={<AddBooks />} /> {/* 36. Route for the add book page */}
          <Route path="/book/:id" element={<EditBook />} /> {/* 37. Route for editing a book by ID */}
          <Route path="/delete/:id" element={<DeleteBook />} /> {/* 38. Route for deleting a book by ID */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App; // 39. Export the App component as the default export

// Explanation of Terms and Concepts:

// 1. BrowserRouter:
// Why: To enable client-side routing in a React application.
// What: A component from React Router that uses the HTML5 history API to keep UI in sync with the URL.
// Where: Used here to wrap the entire routing setup and handle navigation.

// 2. Routes and Route:
// Why: To define and render different views or pages based on the URL path.
// What: Components from React Router that manage route configuration and rendering.
// Where: Used here to specify the paths and corresponding components for each route in the application.

// 3. useState:
// Why: To manage local state in the functional component.
// What: A React hook that allows you to add state to functional components.
// Where: Used here to keep track of the user's role.

// 4. useEffect:
// Why: To perform side effects such as data fetching or subscribing to events.
// What: A React hook that allows you to run side effects in function components.
// Where: Used here to fetch and verify user authentication on component mount.

// 5. axios:
// Why: To make HTTP requests to the backend server for data fetching or sending data.
// What: A promise-based HTTP client that provides methods for making requests.
// Where: Used here to send a GET request for user verification and handle the response.

// 6. Fragment:
// Why: To group multiple elements without adding extra nodes to the DOM.
// What: A React feature that allows you to return multiple elements from a component.
// Where: Used here to wrap the BrowserRouter and Routes components without adding unnecessary HTML elements.
