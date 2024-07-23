// import React from 'react' // 1. Import React if needed, not used in this file directly
import { Link } from 'react-router-dom'; // 2. Import Link from React Router for navigation between routes
import '../css/Navbar.css'; // 3. Import the CSS file to apply styles to the Navbar component

// Define and export the Navbar functional component
export const Navbar = ({ role }) => {
  return (
    <nav className='navbar'> {/* 4. Container for the navigation bar */}
        <div className='navbar-left'> {/* 5. Container for the left side of the navbar */}
            <Link to="/" className='navbar-brand'>Book Store</Link> {/* 6. Link to the home page with branding */}
        </div>
        <div className='navbar-right'> {/* 7. Container for the right side of the navbar */}
            <Link to="/books" className='navbar-link'>Books</Link> {/* 8. Link to the books page */}
            {role === "admin" && <> {/* 9. Conditionally render admin links based on the role */}
              <Link to="/addbook" className='navbar-link'>Add Book</Link> {/* 10. Link to add a new book */}
              <Link to="/addstudent" className='navbar-link'>Add Student</Link> {/* 11. Link to add a new student */}
              <Link to="/dashboard" className='navbar-link'>Dashboard</Link> {/* 12. Link to the admin dashboard */}
            </>
            }
            {role === "" ? // 13. Conditionally render login or logout link based on the role
            <Link to="/Login" className='navbar-link'>Login</Link> {/* 14. Link to the login page */}
            : <Link to="/Logout" className='navbar-link'>Logout</Link> {/* 15. Link to the logout page */}
            }
        </div>
    </nav>
  );
};

// Explanation of Terms and Concepts:

// 1. Link:
// Why: To provide navigation links between different routes in the application.
// What: A component from React Router that allows for navigation without reloading the page.
// Where: Used here to navigate between pages like home, books, login, logout, etc.

// 2. Conditional Rendering:
// Why: To display different navigation links based on the user's role or authentication status.
// What: Using JavaScript conditional statements to render different components or elements.
// Where: Applied here to show admin-specific links and toggle between login and logout links based on the user's role.

// 3. JSX (JavaScript XML):
// Why: To describe the UI structure and appearance in a syntax that resembles HTML.
// What: A syntax extension for JavaScript that allows embedding HTML-like code inside JavaScript.
// Where: Used inside the return statement of the Navbar component to render the navigation bar and links.
