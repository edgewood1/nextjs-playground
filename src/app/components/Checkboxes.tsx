import React from 'react';
import Buttons from './Buttons'

function Checkboxes({ items, onSubmit }) {
    const [selectedValues, setSelectedValues] = React.useState([]);
  
  
    const handleChange = (event) => {
      const value = event.target.value;
      if (event.target.checked) {
        setSelectedValues([...selectedValues, value]);
      } else {
        setSelectedValues(selectedValues.filter((item) => item !== value));
      }
    };
  
    const handleSubmit = () => {
      console.log('calling', onSubmit)
      onSubmit(selectedValues);
    };
  
    return (
      <div>
        {items.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox" // Changed to checkbox
              id={`option${index}`}
              value={item}
              checked={selectedValues.includes(item)}
              onChange={handleChange}
            />
            <label htmlFor={`option${index}`}>{item}</label>
          </div>
        ))}
        <Buttons onClick={handleSubmit}>Submit</Buttons>
      </div>
    );
  }

  export default Checkboxes;