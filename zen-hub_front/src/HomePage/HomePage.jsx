import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { theme } from '../theme.js';
import { ThemeProvider } from '@emotion/react';
import CSSBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import '../App.css';
import GreenCheckmark from '../images/Green-Checkmark.png';
import RedCross from '../images/Red-Cross.png';
import LocationSymbol from '../images/Location.png';
import { getUserName, getUserPath, getRandomPaths, getCoursesUser } from '../Functions/HomePage_Functions.js';
import ResponsiveAppBar from '../AppBar.jsx';
import DropDown from './DropDown.jsx';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, // Usa el color principal del tema
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#FFFFFF",
  }));


export default function HomePage() {

    const [userName, setUsername] = useState("");
    const [userPath, setUserPath] = useState("");
    const [randomPaths, setRandomPaths] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    

    useEffect(() => {
        const fetchUserName = async () => {
        try{
        const username = await getUserName();
        setUsername(username);
        } catch (error){
            console.error("Error en la solicitud fetch: ", error);
        }
    };
    fetchUserName();
    }, []);

    useEffect(() => {
        const fetchPaths = async () => {
        try{
        const paths = await getUserPath();
        setUserPath(paths);
        } catch (error){
            console.error("Error en la solicitud fetch: ", error);
        }
    };
    fetchPaths();
    }, []);

    useEffect(() => {
        const fetchRandomPaths = async () => {
        try{
        const randomPaths = await getRandomPaths();
        setRandomPaths(randomPaths);
        } catch (error){
            console.error("Error en la solicitud fetch: ", error);
        }
    };
    fetchRandomPaths();
    }, []);

    useEffect(() => {
        const fetchUserCourses = async () => {
        try{
            const retrievedCourses = await getCoursesUser();
            setUserCourses(retrievedCourses);
        } catch (error){
            console.error("Error en la solicitud fetch: ", error);
        }
    };
    fetchUserCourses();
    }, []);

    const completedCourses = userCourses.filter(course => course.percentage === 100);
    const missingCourses = userCourses.filter(course => course.percentage !== 100);
    const maxPercentageCourse = userCourses.reduce((maxCourse, currentCourse) => {
        return (currentCourse.percentage > maxCourse.percentage && currentCourse.percentage !== 100) ? currentCourse : maxCourse;
      }, {percentage: 0});  //Este es el valor inicial para maxCourse. Es un objeto con una propiedad percentage que se establece en 0. 

  return (
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
                sx={{ marginLeft: '15px', width: '52px', height: '52px'}}/>
            <strong style={{marginLeft: '17px', marginTop: '8px', fontSize: '25px'}}>{userName}</strong>
            </article>
            <div style={{display: 'flex', marginTop: '55px'}}>
                <span style={{marginLeft: '25px', marginTop: '8px', fontSize: '20px', textAlign: 'left'}}>
                    {`Mi Path:`} <br/> {`${userPath}`}
                </span>
            </div>
            <div style = {{display: 'flex', marginTop: '55px', marginLeft: '5px' }}>
                <DropDown randomPaths={randomPaths}/>
            </div>
        </Item>
        </Grid>
        <Grid item xs={9} md={9}>
        <Grid container direction="column">
            <Grid item container>
            <Grid item xs={6}>
                <Item sx={{ height: '190px', margin: '8px' }}>
                    <div style = {{display: 'flex' }}>
                    <strong style={{marginLeft: '17px', marginTop: '17px', fontSize: '22px', textAlign: 'left'}}>
                        Cursos Completados
                    </strong>
                    <img src = {GreenCheckmark} alt = "Green Checkmark" className = "Checkmark"></img>
                    <br/> 
                    <br/>
                    <br/>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', marginLeft: '19px'}}>
                        {completedCourses.map((course, index) => (
                    <p key={index} style={{marginRight: '20px', marginBottom: '0px', fontSize: "15px", marginTop: '4px'}}>{course.name}</p>
                    ))}
                    </div>
                </Item>
            </Grid>
            <Grid item xs={6}>
                <Item sx={{ height: '190px', margin: '8px' }}>
                    <div style = {{display: 'flex' }}>
                    <strong style={{marginLeft: '16px', marginTop: '17px', fontSize: '22px', textAlign: 'left'}}>
                        Cursos Faltantes
                    </strong>
                    <img src = {RedCross} alt = "Red Cross" className = "Cross"></img>
                    <br/> 
                    <br/>
                    <br/>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', marginLeft: '18px'}}>
                        {missingCourses.map((course, index) => (
                    <p key={index} style={{marginRight: '20px', marginBottom: '0px', fontSize: "15px", marginTop: '4px'}}>{course.name}</p>
                    ))}
                    </div>
                </Item>
            </Grid>
            </Grid>
            <Grid item>
            <Item sx={{ height: '539px', margin: '8px' }}>
                <div style = {{display: 'flex' }}>
                    <strong style={{marginLeft: '25px', marginTop: '25px', fontSize: '30px', textAlign: 'left'}}>
                        Tu Progreso
                    </strong>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <p style={{ marginBottom: '10px', fontSize: "22px", marginTop: '4%', textAlign: 'center'}}>
                        Curso Actual: {maxPercentageCourse.name}
                    </p>


                    <div style={{width: '80%', marginTop: '30px', margin: '0 auto'}}>
                        <img src={LocationSymbol} alt="Location Symbol" style={{width:'16%', height: '16%', display: 'block', marginLeft: `${maxPercentageCourse.percentage}%`}}/>
                        <div style={{borderBottom: '3px dashed white', height: '3px', width: '90%', margin: '0 auto', boxSizing: 'border-box'}}></div>
                            <p style={{ fontSize: "22px", marginTop: '2%', textAlign: 'center'}}>
                                {maxPercentageCourse.percentage}%
                            </p>
                        </div>
                    
                        <a href="https://www.udemy.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" sx={{marginTop: 'px', bgcolor: '#068abb', borderRadius: '50px'}}>Continuar Curso</Button>
                        </a>
                    </div>
            </Item>
            </Grid>
        </Grid>
        </Grid>
    </Grid>
    </Box>
    </ThemeProvider>
  );
}