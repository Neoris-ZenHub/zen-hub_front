import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllPaths } from '../Functions/Ranking_Functions';

// eslint-disable-next-line react/prop-types
export default function SearchableDropdownAdmin( {onPathChange} ) {

    const [paths, setPaths] = useState([]);

    useEffect(() => {
        const fetchPaths = async () => {
        try{
        const paths = await getAllPaths();
        paths.unshift("Global")
        setPaths(paths);
        } catch (error){
            console.error("Error en la solicitud fetch: ", error);
        }
    };
    fetchPaths();
    }, []);
    return (
        <Autocomplete
          options={paths}
          style={{ width: 300, marginLeft: '17%' }}
          ListboxProps={{ style: { maxHeight: '100px', overflow: 'auto' } }} // Ajusta maxHeight según tus necesidades
          renderInput={(params) => <TextField {...params} placeholder="Selecciona una opción aquí"  />}
          onChange= {(event, newValue) => {onPathChange(newValue)}}
        />
    );
}
