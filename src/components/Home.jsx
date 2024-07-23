import '../css/Home.css'; // Import the CSS file to apply styles to the Home component

// Define and export a functional component named Home
export const Home = () => { 
  return (
    <div className="hero"> {/* Container div with class 'hero' for the hero section layout and styling */}
      <div className="hero-content"> {/* Container div for main content within the hero section */}
        <h1 className='hero-text'>Book Shop</h1> {/* Heading with class 'hero-text' for the main title */}
        <p className='hero-description'> {/* Paragraph with class 'hero-description' for a brief description */}
          Browse your books assigned by your teachers. {/* Description text for the page */}
        </p>
      </div>
      <div className="hero-image"></div> {/* Empty div with class 'hero-image' for background or decorative image */}
    </div>
  )
}
