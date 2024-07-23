import { useEffect } from 'react'; // 1. Import useEffect to perform side effects in the Logout component
import { useNavigate } from 'react-router-dom'; // 2. Import useNavigate for programmatic navigation
import axios from 'axios'; // 3. Import axios for making HTTP requests

// Define and export the Logout functional component
export const Logout = ({ setRole }) => { 
    const navigate = useNavigate(); // 4. Initialize navigate for programmatic navigation

    useEffect(() => { // 5. useEffect to perform the logout operation on component mount
        // Make a GET request to the logout endpoint
        axios.get('http://localhost:3001/auth/Logout')
            .then(res => { // 6. Handle the response from the server
                if (res.data.logout) { // 7. Check if logout was successful
                    setRole(''); // 8. Clear the role in the parent component's state
                    navigate('/'); // 9. Navigate to the home page after logout
                }
            })
            .catch(err => console.log(err)); // 10. Log any errors from the request
    }, []); // 11. Empty dependency array means this effect runs once after the initial render
};

// Explanation of Terms and Concepts:

// 1. useEffect:
// Why: To perform side effects such as making HTTP requests when the component mounts.
// What: A React hook that lets you run side effects in function components.
// Where: Used here to trigger a logout request when the Logout component is mounted.

// 2. useNavigate:
// Why: To programmatically navigate to different routes after logging out.
// What: A React Router hook that provides a navigate function for changing routes.
// Where: Used here to redirect users to the home page after a successful logout.

// 3. axios:
// Why: To make HTTP requests to the backend server for logging out.
// What: A promise-based HTTP client for making requests.
// Where: Used here to send a GET request to the logout endpoint and handle responses.

// 4. handleSubmit:
// Why: To handle the form submission and send the logout request.
// What: A function that sends a request to log the user out and processes the response.
// Where: Defined inside the Logout component and triggered on component mount.

// 5. JSX (JavaScript XML):
// Why: To describe the UI structure and appearance in a syntax that resembles HTML.
// What: A syntax extension for JavaScript that allows embedding HTML-like code inside JavaScript.
// Where: In this case, JSX is not directly used because the component does not render any UI elements.
