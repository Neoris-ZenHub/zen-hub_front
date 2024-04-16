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
import Button from '@mui/material/Button';
import VirtualTable from './VirtualTable.jsx';
import { getUserName } from '../Functions/HomePage_Functions.js';
import RadioButtonsGroup from './RadioButton.jsx';
import SearchableDropdown from './SearchableDropdown.jsx';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, // Usa el color principal del tema
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#FFFFFF",
  }));


export default function Ranking() {

    const [userName, setUsername] = useState("");

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
            <div style = {{display: 'flex', justifyContent: 'center', marginTop: '90%', marginRight: '35%' }}>
            <Box marginTop = {'-100%'}>
                <SearchableDropdown />
            </Box>
            </div>
            <div style = {{display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
            <Box marginRight = {'55%'}>
                <RadioButtonsGroup />
            </Box>
            
            </div>
        </Item>
        </Grid>

            <Grid item xs={9} md={9}>
            <Item sx={{ height: '745px', margin: '8px'}}>
            <div style = {{display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                <strong style={{ fontSize: '42px', textAlign: 'center'}}>
                    Ranking:
                </strong>
            </div>
            <Box sx={{ marginTop: '8%', display: 'flex', justifyContent: 'center' }}>
                <VirtualTable />

            </Box>
            </Item>
            </Grid>


            </Grid>
        </Box>
        </ThemeProvider>
    );
}