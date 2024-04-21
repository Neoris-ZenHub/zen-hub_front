import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getCoursesUser } from '../Functions/HomePage_Functions';

// eslint-disable-next-line react/prop-types
export default function SearchableDropdownCourses( {onCourseChange} ) {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchPaths = async () => {
        try{
        const response = await getCoursesUser();
        const courses = response.map((courses) => courses.name);
        setCourses(courses);
        } catch (error){
            console.error("Error en la solicitud fetch: ", error);
        }
    };
    fetchPaths();
    }, []);
    return (
        <Autocomplete
          options={courses}
          style={{ width: 300, marginLeft: '17%' }}
          ListboxProps={{ style: { maxHeight: '100px', overflow: 'auto' } }} // Ajusta maxHeight según tus necesidades
          renderInput={(params) => <TextField {...params} placeholder="Selecciona una opción aquí"  />}
          onChange= {(event, newValue) => {onCourseChange(newValue)}}
        />
    );
}
