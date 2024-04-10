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
import { getUserName, getUserPath, getRandomPaths } from '../Functions/HomePage_Functions.js';
import ResponsiveAppBar from '../AppBar.jsx';
import DropDown from './DropDown.jsx';

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
                sx={{ marginLeft: '10px', width: '52px', height: '52px'}}/>
            <strong style={{marginLeft: '17px', marginTop: '8px', fontSize: '25px'}}>{userName}</strong>
            </article>
            <div style = {{display: 'flex', marginTop: '55px' }}>
                <span style={{marginLeft: '20px', marginTop: '8px', fontSize: '20px'}}>{`Mi Path: ${userPath}`}</span>
            </div>
            <div style = {{display: 'flex', marginTop: '55px' }}>
                <DropDown randomPaths={randomPaths}/>
            </div>
        </Item>
        </Grid>
        <Grid item xs={9} md={9}>
        <Grid container direction="column">
            <Grid item container>
            <Grid item xs={6}>
                <Item sx={{ height: '190px', margin: '8px' }}></Item>
            </Grid>
            <Grid item xs={6}>
                <Item sx={{ height: '190px', margin: '8px' }}></Item>
            </Grid>
            </Grid>
            <Grid item>
            <Item sx={{ height: '539px', margin: '8px' }}></Item>
            </Grid>
        </Grid>
        </Grid>
    </Grid>
    </Box>
    </ThemeProvider>
  );
}