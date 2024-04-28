import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { theme } from '../theme.js';
import { ThemeProvider } from '@emotion/react';
import CSSBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import '../App.css';
import ResponsiveAppBar from '../AppBar.jsx';
import SearchableDropdownCourses from './SearchableDropdownCourses.jsx';
import InputFileUpload from './UploadFile.jsx';
import { useContext } from 'react';
import { UserInfoContext } from '../UserInfoContext.jsx';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, // Usa el color principal del tema
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#FFFFFF",
  }));

  

export default function EvidenceUser(){

    const { userName } = useContext(UserInfoContext);
    const [course, setCourse] = useState([]);

    const handleCourseChange = async (newValue) => {
        if (!newValue) {
            return;
          }
        setCourse(newValue);
      };

    return(
        <ThemeProvider theme={theme}>
        <CSSBaseline />
        <ResponsiveAppBar />
        <Box sx={{ flexGrow: 1 }}>
        <Grid container>
        <Grid item xs={3} md={3}>
        <Item sx={{ height: '745px', margin: '8px'}}>

        <article style = {{display: 'flex', marginTop: '25px', marginLeft: "5px" }}>
            <Avatar 
                alt="User Avatar" 
                src= {`https://unavatar.io/${userName}`} 
                sx={{ marginLeft: '8px', width: '52px', height: '52px'}}/>
            <strong style={{marginLeft: '17px', marginTop: '8px', fontSize: '25px'}}>{userName}</strong>
            </article>
            <div style = {{display: 'flex', justifyContent: 'center', marginTop: '90%', marginRight: '35%' }}>
            <Box marginTop = {'-100%'}>
                <strong style={{ fontSize: '22px', marginLeft: '15%'}}> Curso de la Evidencia:</strong>
                <Box marginTop = {'5%'}>
                <SearchableDropdownCourses 
                    onCourseChange = {handleCourseChange}
                />
                </Box>
            </Box>
            </div>

        </Item>
        </Grid>

        <Grid item xs={9} md={9}>
            <Item sx={{ height: '745px', margin: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <strong style={{ fontSize: '22px', marginBottom: '10%' }}>Escoger Evidencia:</strong>
                <InputFileUpload  selectedCourse = {course}/>
            </div>
            </Item>
        </Grid>
        
        </Grid>
        </Box>
        </ThemeProvider>
    )
}