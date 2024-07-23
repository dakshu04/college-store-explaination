// Dashboard.jsx

import { useEffect, useState } from "react"; // Import useEffect and useState hooks from React
import "../css/Dashboard.css"; // Import the CSS file for styling the Dashboard component
import axios from "axios"; // Import axios for making HTTP requests

export const Dashboard = () => { // Define and export a functional component named Dashboard
  const [students, setStudent] = useState(0); // Define a state variable students initialized to 0 and setStudent to update it
  const [admin, setAdmin] = useState(0); // Define a state variable admin initialized to 0 and setAdmin to update it
  const [books, setBooks] = useState(0); // Define a state variable books initialized to 0 and setBooks to update it

  useEffect(() => { // useEffect hook to perform side effects (fetch data) when the component mounts
    axios
      .get("http://localhost:3001/dashboard") // Make a GET request to fetch dashboard data
      .then((res) => { // Handle the response from the GET request
        if (res.data.ok) { // Check if the response is OK
          setStudent(res.data.student); // Update the state variable students with the data received from the response
          setAdmin(res.data.admin); // Update the state variable admin with the data received from the response
          setBooks(res.data.book); // Update the state variable books with the data received from the response
        }
      })
      .catch((err) => console.log(err)); // Handle any errors that occur during the request
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="dashboard"> {/* Container for the dashboard with a specific CSS class for styling */}
      <div className="dashboard-box"> {/* Container for total books with a specific CSS class for styling */}
        <h2>Total Books</h2> {/* Header for the total books section */}
        <div className="number">{books}</div> {/* Display the number of books */}
      </div>

      <div className="dashboard-box"> {/* Container for total students with a specific CSS class for styling */}
        <h2>Total Students</h2> {/* Header for the total students section */}
        <div className="number">{students}</div> {/* Display the number of students */}
      </div>

      <div className="dashboard-box"> {/* Container for total admin with a specific CSS class for styling */}
        <h2>Total Admin</h2> {/* Header for the total admin section */}
        <div className="number">{admin}</div> {/* Display the number of admins */}
      </div>
    </div>
  );
};

/*
Explanation of each line:

1. import { useEffect, useState } from "react";
   - Why: To use React hooks for managing state and side effects.
   - What: Imports the useEffect and useState hooks from React.
   - Where: Imported from the react library.

2. import "../css/Dashboard.css";
   - Why: To apply specific styles to the Dashboard component.
   - What: Imports the CSS file containing styles for the Dashboard component.
   - Where: Imported from the local CSS file located in the css directory.

3. import axios from "axios";
   - Why: To make HTTP requests to fetch data from the server.
   - What: Imports the axios library for making HTTP requests.
   - Where: Imported from the axios package.

4. export const Dashboard = () => {
   - Why: To create and export a functional component named Dashboard.
   - What: Defines the Dashboard component.
   - Where: The component is defined in this file and will be used elsewhere in the application.

5. const [students, setStudent] = useState(0);
   - Why: To manage the state of the students count.
   - What: Defines a state variable students initialized to 0, and setStudent to update it.
   - Where: This is done within the Dashboard component.

6. const [admin, setAdmin] = useState(0);
   - Why: To manage the state of the admin count.
   - What: Defines a state variable admin initialized to 0, and setAdmin to update it.
   - Where: This is done within the Dashboard component.

7. const [books, setBooks] = useState(0);
   - Why: To manage the state of the books count.
   - What: Defines a state variable books initialized to 0, and setBooks to update it.
   - Where: This is done within the Dashboard component.

8. useEffect(() => {
   - Why: To perform side effects such as fetching data when the component mounts.
   - What: Defines an effect that runs when the component mounts.
   - Where: Inside the Dashboard component.

9. axios.get("http://localhost:3001/dashboard")
   - Why: To fetch the dashboard data from the server.
   - What: Makes a GET request to the specified URL to retrieve the dashboard data.
   - Where: Inside the useEffect hook.

10. .then((res) => {
    - Why: To handle the response from the GET request.
    - What: Processes the response from the server.
    - Where: Chained to the axios GET request.

11. if (res.data.ok) {
    - Why: To check if the response is OK.
    - What: Evaluates the condition to check if the response is OK.
    - Where: Inside the then block.

12. setStudent(res.data.student);
    - Why: To update the state with the number of students received from the server.
    - What: Updates the students state variable with the received data.
    - Where: Inside the if block.

13. setAdmin(res.data.admin);
    - Why: To update the state with the number of admins received from the server.
    - What: Updates the admin state variable with the received data.
    - Where: Inside the if block.

14. setBooks(res.data.book);
    - Why: To update the state with the number of books received from the server.
    - What: Updates the books state variable with the received data.
    - Where: Inside the if block.

15. .catch((err) => console.log(err));
    - Why: To handle any errors that occur during the request.
    - What: Logs any errors to the console.
    - Where: Chained to the axios GET request.

16. }, []);
    - Why: To ensure the useEffect hook runs only once when the component mounts.
    - What: Specifies an empty dependency array for the useEffect hook.
    - Where: Inside the useEffect hook.

17. <div className="dashboard">
    - Why: To create a container for the dashboard with a specific class for styling.
    - What: Defines a div element with the class name dashboard.
    - Where: This is part of the JSX returned by the Dashboard component.

18. <div className="dashboard-box">
    - Why: To create a container for each dashboard box with a specific class for styling.
    - What: Defines a div element with the class name dashboard-box.
    - Where: Inside the dashboard div.

19. <h2>Total Books</h2>
    - Why: To add a header for the total books section.
    - What: Defines an h2 element with the text "Total Books".
    - Where: Inside the dashboard-box div.

20. <div className="number">{books}</div>
    - Why: To display the number of books.
    - What: Defines a div element with the class name number and displays the value of the books state variable.
    - Where: Inside the dashboard-box div.

21. <div className="dashboard-box">
    - Why: To create a container for each dashboard box with a specific class for styling.
    - What: Defines a div element with the class name dashboard-box.
    - Where: Inside the dashboard div.

22. <h2>Total Students</h2>
    - Why: To add a header for the total students section.
    - What: Defines an h2 element with the text "Total Students".
    - Where: Inside the dashboard-box div.

23. <div className="number">{students}</div>
    - Why: To display the number of students.
    - What: Defines a div element with the class name number and displays the value of the students state variable.
    - Where: Inside the dashboard-box div.

24. <div className="dashboard-box">
    - Why: To create a container for each dashboard box with a specific class for styling.
    - What: Defines a div element with the class name dashboard-box.
    - Where: Inside the dashboard div.

25. <h2>Total Admin</h2>
    - Why: To add a header for the total admin section.
    - What: Defines an h2 element with the text "Total Admin".
    - Where: Inside the dashboard-box div.

26. <div className="number">{admin}</div>
    - Why: To display the number of admins.
    - What: Defines a div element with the class name number and displays the value of the admin state variable.
    - Where: Inside the dashboard-box div.
*/ 
