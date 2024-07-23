import React from 'react'; // 1. Import React to enable JSX syntax and use React's features
import ReactDOM from 'react-dom/client'; // 2. Import ReactDOM to render the React application to the DOM
import App from './App.jsx'; // 3. Import the main App component which is the root component of the application

// Create a root element and render the App component inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* 4. React.StrictMode helps identify potential problems in the application by activating additional checks and warnings */}
    <App /> {/* 5. Render the App component, which is the main component of the application */}
  </React.StrictMode>,
);

// Explanation of Terms and Concepts:

// React:
// Why: To build user interfaces using components.
// What: A JavaScript library for building user interfaces, primarily for single-page applications.
// Where: Used here to build and render the application's component tree.

// ReactDOM:
// Why: To render React components to the DOM.
// What: A package that provides methods to interact with the DOM and render React components.
// Where: Used here to render the App component to the root DOM element.

// ReactDOM.createRoot:
// Why: To create a root for the React application where components can be rendered.
// What: A method to create a root element for rendering a React application.
// Where: Used here to get the root element with the ID 'root' and render the App component into it.

// React.StrictMode:
// Why: To activate additional checks and warnings for development mode.
// What: A wrapper component that helps identify potential issues in the application.
// Where: Used here to wrap the App component to enable these checks during development.

// App Component:
// Why: To serve as the root component for the application, managing the application's routing and state.
// What: A functional component that includes the application's routing configuration and main layout.
// Where: Imported and rendered as the root component of the application.
