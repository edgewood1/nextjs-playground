import React from 'react';
import Buttons from './Buttons';

interface CheckboxProps {
  items: string[];
  onSubmit: (values: string[]) => void;
}

function Checkboxes({ items, onSubmit }: CheckboxProps) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log('calling', onSubmit);
    onSubmit(selectedValues);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`option${index}`}
            value={item}
            checked={selectedValues.includes(item)}
            onChange={handleChange}
          />
          <label style={{color: 'blue', paddingLeft: '5px'}} htmlFor={`option${index}`}>{item}</label>
        </div>
      ))}
      <Buttons onClick={handleSubmit}>Submit</Buttons>
    </div>
  );
}

export default Checkboxes;