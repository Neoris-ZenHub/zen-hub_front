import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { theme } from '../theme.js';
import { ThemeProvider } from '@emotion/react';
import CSSBaseline from '@mui/material/CssBaseline';
import '../App.css';
import ResponsiveAppBar from '../AppBar.jsx';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, // Usa el color principal del tema
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#FFFFFF",
  }));

export default function MarketPlace(){

    return(
        <ThemeProvider theme={theme}>
        <CSSBaseline />
        <ResponsiveAppBar />
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <Item sx={{ height: '745px', margin: '8px'}}>

                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );

}