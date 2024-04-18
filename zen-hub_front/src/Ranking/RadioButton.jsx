import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function RadioButtonsGroup( {onRadioChange} ) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value); // Actualiza el estado value
    onRadioChange(event.target.value);
    
  };
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" sx={{marginRight: '70%'}}>Medida:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue= "Puntaje"
        value={value}
        onChange={handleChange}
        
      >
        <FormControlLabel value="Neorimas" control={<Radio />} label="Neorimas" />
        <FormControlLabel value="Puntaje" control={<Radio />} label="Puntaje" />
      </RadioGroup>
    </FormControl>
  );
}