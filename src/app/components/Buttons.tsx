import React from 'react';

function Buttons({ children, onClick }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Reset after 200ms (adjust as needed)
    onClick(); // Call the original onClick handler
  };

  return (
    <button
      style={{
        background: isHovered ? 'linear-gradient(to right, #0ED2F7, #B2FEFA)' : 'linear-gradient(to right, #B2FEFA, #0ED2F7)',
        border: 'none',
        color: isClicked ? 'black' : 'dark-brown', // Change text color on click
        padding: '12px 24px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '8px',
        cursor: 'pointer',
        borderRadius: '4px',
        boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
        transition: 'all 0.3s ease',

        ':active': {
          boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(1px)',
        },
      }}
      onClick={handleClick} // Use the custom handleClick function
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}

export default Buttons;