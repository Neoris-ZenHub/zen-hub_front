import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function RadioButtonAdmin( {onRadioChange} ) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value); // Actualiza el estado value
    onRadioChange(event.target.value);
    
  };
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" sx={{marginRight: '70%'}}>Orden:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue= "Reciente"
        value={value}
        onChange={handleChange}
        
      >
        <FormControlLabel value="Reciente" control={<Radio />} label="Reciente" />
        <FormControlLabel value="Antiguo" control={<Radio />} label="Antiguo" />
      </RadioGroup>
    </FormControl>
  );
}