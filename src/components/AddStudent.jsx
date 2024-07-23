import { useState } from 'react'; // Import useState hook from React to manage state in the component
import "../css/AddStudent.css"; // Import the CSS file for styling the component

import axios from 'axios'; // Import axios to handle HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom for navigation

const AddStudent = () => { // Define a functional component named AddStudent

    // State variables to store form input values
    const [roll, setRoll] = useState(''); // useState hook to create a state variable for roll number, initialized as an empty string
    const [username, setUsername] = useState(''); // useState hook to create a state variable for username, initialized as an empty string
    const [grade, setGrade] = useState(''); // useState hook to create a state variable for grade, initialized as an empty string
    const [password, setPassword] = useState(''); // useState hook to create a state variable for password, initialized as an empty string

    const navigate = useNavigate(''); // Initialize navigate function to programmatically navigate to different routes

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior (prevent page reload)

        // Use axios to send a POST request to register a new student
        // POST Request: Used to send data to the server to create a new resource.
        // In this case, we are sending new student data to create a new student record on the server.
        axios.post('http://localhost:3001/student/register', { roll, username, password, grade }, { withCredentials: true })
            .then(res => { // Handle the response from the server
                if(res.data.registered) { // Check if the student was successfully registered
                    navigate('/dashboard'); // Navigate to the '/dashboard' route
                    console.log(res); // Log the response for debugging purposes
                }
            })
            .catch(err => console.log('Axios error is', err)); // Log any errors that occur during the request
    };

    return (
        <div> {/* Parent container */}
            <div className='student-form-container'> {/* Container for the form with a specific CSS class for styling */}
                <form className='student-form' onSubmit={handleSubmit}> {/* Form element with an onSubmit handler */}
                    <h2>Add Student</h2> {/* Form heading */}
                    
                    <div className='form-group'> {/* Group for roll number input */}
                        <label htmlFor="roll">Roll No:</label> {/* Label for the roll number input field */}
                        <input 
                            type="text" 
                            id='roll' 
                            name='roll' 
                            onChange={(e) => setRoll(e.target.value)} // Update the roll state when input changes
                        />
                    </div>

                    <div className='form-group'> {/* Group for username input */}
                        <label htmlFor="username">User Name:</label> {/* Label for the username input field */}
                        <input 
                            type="text" 
                            id='username' 
                            name='username'
                            onChange={(e) => setUsername(e.target.value)} // Update the username state when input changes
                        /> 
                    </div>

                    <div className='form-group'> {/* Group for grade input */}
                        <label htmlFor="grade">Grade:</label> {/* Label for the grade input field */}
                        <input 
                            type="text" 
                            id='grade' 
                            name='grade'
                            onChange={(e) => setGrade(e.target.value)} // Update the grade state when input changes
                        />
                    </div>

                    <div className='form-group'> {/* Group for password input */}
                        <label htmlFor="password">Password:</label> {/* Label for the password input field */}
                        <input 
                            type="text" 
                            id='password' 
                            name='password'
                            onChange={(e) => setPassword(e.target.value)} // Update the password state when input changes
                        />
                    </div>

                    <button type='submit'>Register</button> {/* Submit button to trigger form submission */}
                </form>
            </div>
        </div>
    );
}

export default AddStudent; // Export the AddStudent component as the default export

/*
Explanation of HTTP Methods Used:

1. POST Request:
   - Purpose: To send data to the server to create a new resource.
   - Usage: Used when you need to add new data, such as registering a new student.
   - Example: 
     axios.post('http://localhost:3001/student/register', { roll, username, password, grade }, { withCredentials: true })
       .then(res => console.log(res.data))
       .catch(err => console.log('Axios error is', err));
   - Relevance: The POST request is appropriate here because you are creating a new resource (a new student) on the server. Using POST ensures that the server processes the data correctly and creates a new record.

2. GET Request:
   - Purpose: To retrieve data from the server.
   - Usage: Used when you need to fetch data, such as getting a list of students or details of a specific book.
   - Example:
     axios.get('http://localhost:3001/student')
       .then(res => console.log(res.data))
       .catch(err => console.log('Axios error is', err));
   - Relevance: It is safe and idempotent (repeated requests produce the same result).

3. PUT Request:
   - Purpose: To update an existing resource completely.
   - Usage: Used when you need to update the entire resource, such as changing all details of a student.
   - Example:
     axios.put('http://localhost:3001/student/123', { roll, username, password, grade }, { withCredentials: true })
       .then(res => console.log(res.data))
       .catch(err => console.log('Axios error is', err));
   - Relevance: It is idempotent (repeated requests with the same data will produce the same result).

4. DELETE Request:
   - Purpose: To delete a resource from the server.
   - Usage: Used when you need to remove data, such as deleting a student's record.
   - Example:
     axios.delete('http://localhost:3001/student/123', { withCredentials: true })
       .then(res => console.log(res.data))
       .catch(err => console.log('Axios error is', err));
   - Relevance: It is used to remove resources and is idempotent (repeated requests will produce the same result as long as the resource is already deleted).

5. PATCH Request:
   - Purpose: To partially update an existing resource.
   - Usage: Used when you need to update some fields of a resource, such as changing the grade of a student.
   - Example:
     axios.patch('http://localhost:3001/student/123', { grade: 'A+' }, { withCredentials: true })
       .then(res => console.log(res.data))
       .catch(err => console.log('Axios error is', err));
   - Relevance: It is not idempotent (repeated requests can produce different results if the data changes between requests).
*/
