import { Button } from '@mantine/core';

export const Buttons2 = (props) => {
    const {text, handler, show} = props;
    if (!show) return;
    
    return (
        <div>
             {text.map((t, index) => (
        <Button onClick={handler} key={index}>{t}</Button>
      ))}
        </div>
    )

}