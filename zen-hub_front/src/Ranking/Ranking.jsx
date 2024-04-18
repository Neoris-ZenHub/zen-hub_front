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
import TextField from '@mui/material/TextField';
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
    const [ranking, setRanking] = useState([]);
    const [sortField, setSortField] = useState("Global");
    const [orderField, setOrderField] = useState("puntaje")
    const [userSearch, setUserSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
        const fetchInitialRanking = async () => {
          try {
            const response = await fetchRanking(sortField, orderField, userSearch);
            if (response.user) {
                setRanking([response.user]);
                setErrorMessage("");
            } else if (response.message === "User not found") {
                setErrorMessage("Usuario no encontrado");
            } else {
                const {users} = response;
                setRanking(users);
                setErrorMessage("");
            }
          } catch (error) {
            console.error("Error en la solicitud fetch: ", error);
          }
        };
        fetchInitialRanking();
      }, [sortField, orderField, userSearch]);

    const handlePathChange = async (newValue) => {
        if (!newValue) {
            return;
          }

        setSortField(newValue);
      };
      
      const handleRadioChange = async (newValue) => {
        if (!newValue) {
            return;
          }
        setOrderField(newValue);
      };

    const fetchRanking = async (sortField, orderField, userSearch) => {
        const rankingURL = `http://localhost:4000/users/ranking?sortField=${encodeURIComponent(sortField)}&orderField=${encodeURIComponent(orderField)}&userSearch=${encodeURIComponent(userSearch)}`;
    
        const token = localStorage.getItem('token');
    
        const data = await fetch(rankingURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        });
        if (!data.ok) {
        throw new Error(`Error HTTP: ${data.status}`);
        }
        const response = await data.json();

        if (response.user) {
            setRanking([response.user]);
            setErrorMessage("");
          } else if (response.message === "User not found") {
            setErrorMessage("Usuario no encontrado");
          } else {
            const {users} = response;
            setRanking(users);
            setErrorMessage("");
          }
        };

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
                <strong style={{ fontSize: '22px'}}> Global o por Path:</strong>
                <Box marginTop = {'5%'}>
                <SearchableDropdown 
                    onPathChange = {handlePathChange}
                />
                </Box>
            </Box>
            </div>
            <div style = {{display: 'flex', justifyContent: 'center', marginTop: '-25%' }}>
            <Box marginRight = {'52.5%'}>
                <RadioButtonsGroup 
                    onRadioChange={handleRadioChange}/>
            </Box>
            
            </div>
            <Box marginTop = {'20%'} marginRight = {'0%'} marginLeft={'-2%'}>
                <Box textAlign='left' marginLeft={'6%'}>
                <strong style={{ fontSize: '22px'}}> Buscar Usuario</strong>
                </Box>
                <Box marginTop = {'5%'}>
                <TextField
                style = {{width: '90%'}}
                label="Nombre de Usuario a Buscar"
                variant="outlined"
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        setUserSearch(event.target.value);
                    } 
                }}
                />
                </Box>
            </Box>
        </Item>
        </Grid>

            <Grid item xs={9} md={9}>
            <Item sx={{ height: '745px', margin: '8px'}}>
            <div style = {{display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                <strong style={{ fontSize: '42px', textAlign: 'center'}}>
                    Ranking:
                </strong>
            </div>
            <Box sx={{ height: '25px', marginTop: '2%', display: 'flex', justifyContent: 'center' }}>
                <strong style={{ fontSize: '22px', textAlign: 'center'}}>
                    {errorMessage}
                </strong>
            </Box>
            <Box sx={{ marginTop: '3%', display: 'flex', justifyContent: 'center' }}>
                <VirtualTable data={ranking} />
            </Box>
            </Item>
            </Grid>


            </Grid>
        </Box>
        </ThemeProvider>
    );

}