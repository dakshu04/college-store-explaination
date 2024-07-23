import { useState } from 'react'; // 1. Import useState to manage local state within the Login component
import "../css/Login.css"; // 2. Import the CSS file to apply styles to the Login component
import axios from "axios"; // 3. Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // 4. Import useNavigate for programmatic navigation

// Define and export the Login functional component
export const Login = ({ setRoleVar }) => { 
  // Define state variables for username, password, and role
  const [username, setUsername] = useState(''); // 5. State for storing the username input
  const [password, setPassword] = useState(''); // 6. State for storing the password input
  const [role, setRole] = useState('admin'); // 7. State for storing the role selection, default is 'admin'
  const navigate = useNavigate(); // 8. Initialize navigate for programmatic navigation

  // Configure axios to include credentials (cookies) with requests
  axios.defaults.withCredentials = true; // 9. Ensure cookies are included with HTTP requests

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // 10. Prevent the default form submission behavior

    // Make a POST request to the login endpoint with username, password, and role
    axios.post('http://localhost:3001/auth/login', { username, password, role })
      .then(res => { // 11. Handle the response from the server
        console.log('Response:', res); // 12. Log the entire response object for debugging
        console.log('Response Data:', res.data); // 13. Log the response data for debugging
        
        // Check if login was successful and handle navigation based on role
        if (res.data.login && res.data.role === 'admin') { // 14. Check if login is successful and user is admin
          setRoleVar('admin'); // 15. Set the role in the parent component's state
          navigate('/dashboard'); // 16. Navigate to the admin dashboard
        } else if (res.data.login && res.data.role === 'student') { // 17. Check if login is successful and user is student
          setRoleVar('student'); // 18. Set the role in the parent component's state
          navigate('/'); // 19. Navigate to the home page for students
        }
      })
      .catch(err => console.log('Axios error is', err)); // 20. Log any errors from the request
  };

  return (
    <div className="login-page"> {/* 21. Container div with class 'login-page' for styling the login page */}
      <div className="login-container"> {/* 22. Inner container div for the login form */}
        <h2>Login</h2><br /> {/* 23. Heading for the login form */}
        <form onSubmit={handleSubmit}> {/* 24. Form element with onSubmit handler for form submission */}
          <div className="form-group"> {/* 25. Container div for the username input */}
            <label htmlFor="username">Username:</label> {/* 26. Label for the username input */}
            <input type="text" placeholder="Enter Username" /* 27. Input field for username */
              onChange={(e) => setUsername(e.target.value)} /> {/* 28. Update username state on input change */}
          </div>
          <div className="form-group"> {/* 29. Container div for the password input */}
            <label htmlFor="password">Password:</label> {/* 30. Label for the password input */}
            <input type="password" placeholder="Enter Password" /* 31. Input field for password */
              onChange={(e) => setPassword(e.target.value)} /> {/* 32. Update password state on input change */}
          </div>
          <div className="form-group"> {/* 33. Container div for the role selection */}
            <label htmlFor="role">Role:</label> {/* 34. Label for the role selection */}
            <select name="role" id="role" onChange={(e) => setRole(e.target.value)}> {/* 35. Dropdown for role selection */}
              <option value="admin">Admin</option> {/* 36. Option for 'Admin' role */}
              <option value="student">Student</option> {/* 37. Option for 'Student' role */}
            </select>
          </div>
          <button type="submit" className="btn-login">Login</button> {/* 38. Submit button for the form */}
        </form>
      </div>
    </div>
  );
};

// Explanation of Terms and Concepts:

// 1. useState:
// Why: To manage local state for username, password, and role within the Login component.
// What: A React hook that provides state variables and corresponding setters.
// Where: Used here to create state variables and update them.

// 2. useNavigate:
// Why: To programmatically navigate to different routes after a successful login.
// What: A React Router hook that provides a navigate function for changing routes.
// Where: Used here to redirect users to different pages based on their role.

// 3. axios:
// Why: To make HTTP requests to the backend server for user authentication.
// What: A promise-based HTTP client for making requests.
// Where: Used here to send POST requests to the login endpoint and handle responses.

// 4. axios.defaults.withCredentials:
// Why: To ensure that cookies are included with the HTTP requests, which is essential for maintaining sessions.
// What: A global configuration for axios to include credentials with requests.
// Where: Configured here to handle sessions and authentication cookies.

// 5. handleSubmit:
// Why: To handle the form submission, send the login request, and navigate based on the response.
// What: A function that prevents the default form submission and processes the login request.
// Where: Defined inside the Login component and triggered on form submission.

// 6. JSX (JavaScript XML):
// Why: To describe the UI structure and appearance in a syntax that resembles HTML.
// What: A syntax extension for JavaScript that allows embedding HTML-like code inside JavaScript.
// Where: Used inside the return statement of the Login component to render the form and UI elements.
