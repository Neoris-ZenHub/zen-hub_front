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
import ResponsiveAppBar from '../AppBar.jsx';
import SearchableDropdown from '../Ranking/SearchableDropdown.jsx';
import { useContext } from 'react'; 
import { UserInfoContext } from '../UserInfoContext.jsx';
import { getCoursesbyPath } from '../Functions/Paths_Functions.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { pathsAssignment } from '../Functions/Paths_Functions.js';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, // Usa el color principal del tema
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#FFFFFF",
  }));


export default function Paths(){

    const { userName } = useContext(UserInfoContext);
    const [path, setPath] = useState("");
    const [courses, setCourses] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");

    const handlePathChange = async (newValue) => {
        if (!newValue) {
            return;
          }

        setPath(newValue);
      };

    const handlePathAssignment = async () => {
        try{
            const response = await pathsAssignment(path);
            if (response.message === "User path and courses assigned successfully"){
                setAlertType("success");
                setAlertMessage("Path y Cursos asignados correctamente");
                setAlertOpen(true);
            } else if (response.message === "User already has an assigned path"){
                setAlertType("warning");
                setAlertMessage("Ya tienes un Path asignado");
                setAlertOpen(true);
            } else if (response.message === "Path not found"){
                setAlertType("error");
                setAlertMessage("Path no encontrado");
                setAlertOpen(true);
            } else {
                setAlertType("error");
                setAlertMessage("Ocurrió un error al asignar el Path");
                setAlertOpen(true);
            }
        } catch (error){
            console.error("Error al asignar el path: ", error.message);
        }
    }

    useEffect(() => {
        const fetchCourses = async() => {
            if (path){
                try{
                    const response = await getCoursesbyPath(path);
                    const {courses} = response;
                    const coursesArray = courses.map(course => course.name + " - " + course.duration + " minutos");
                    setCourses(coursesArray);
                } catch (error){
                    console.error("Error en la solicitud fetch: ", error);
                }
            } 
        };
    fetchCourses();
    }, [path]);

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
                            sx={{ marginLeft: '2%', width: '52px', height: '52px'}}/>
                        <strong style={{marginLeft: '6%', marginTop: '2.5%', fontSize: '25px'}}>{userName}</strong>
                        </article>
                        <div style = {{display: 'flex', justifyContent: 'center', marginTop: '90%', marginRight: '35%' }}>
                            <Box marginTop = {'-100%'}>
                                <strong style={{ fontSize: '22px'}}> Paths Disponibles:</strong>
                                <Box marginTop = {'5%'}>
                                    <SearchableDropdown 
                                        onPathChange = {handlePathChange}

                                    />
                                </Box>
                            </Box>
                            </div>
                </Item>
                </Grid>

                <Grid item xs={9} md={9}>
                <Item sx={{ height: '745px', margin: '8px', display: 'flex', flexDirection: 'column', paddingTop: '100px' }}>
                    <div>
                        <Typography variant="h4" gutterBottom component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Cursos del Path:
                        </Typography>
                    </div>
                    <div style={{ height: 'calc(60% - 50px)', marginTop: '7%' }}>
                        <div style={{ width: '100%', maxHeight: '100%', overflow: 'auto' }}>
                            <List style={{ width: 'fit-content', margin: '0 auto' }}>
                                {courses.map((course, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={course} sx={{ textAlign: 'center' }} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </div>
                    {courses && courses.length > 0 &&
                    <div style={{ height: '50px', width: '100%', marginTop: '4%' }}>
                        <Button variant="contained" color="primary" onClick= {handlePathAssignment} style={{ width: '30%', margin: '0 auto' }}>
                            Empezar Path
                        </Button>
                    </div>
                    }
                </Item>
            </Grid>
                </Grid>
            </Box>

                <Snackbar
                    open={alertOpen}
                    autoHideDuration={5000}
                    onClose={() => setAlertOpen(false)}
                    >
                    <Alert onClose={() => setAlertOpen(false)} severity={alertType} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
        </ThemeProvider>
    )
}