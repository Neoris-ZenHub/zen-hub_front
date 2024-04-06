import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NeorisIconLight from './images/NeorisLogoLight.png';
import './App.css';
import { Login_Function } from './Functions/Login_Functions.js';


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1B242A', 
    },
    secondary: {
      main: '#F3F2F2', 
    },
  },
});


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

     //Verificar que ningun campo este vació
    if ( !email || !password) {
      setErrorMessage("Favor de llenar todos los campos requeridos")
      return;
    }

    Login_Function(email, password);
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx = {{ marginTop: 20 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src = {NeorisIconLight} alt = "Neoris Icon" className= "LogoNeoris"></img>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {e => setEmail(e.target.value)}
              InputLabelProps={{
                sx: {
                  color: '#F3F2F2',
                  '&.Mui-focused': {
                    color: '#F3F2F2',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {e => setPassword(e.target.value)}
              InputLabelProps={{
                sx: {
                  color: '#F3F2F2',
                  '&.Mui-focused': {
                    color: '#F3F2F2',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: '#F3F2F2', backgroundColor: '#1B242A', }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href ="/signup" variant="body2" sx ={{color: '#F3F2F2'}}>
                  {"No tienes una cuenta? Registrate aquí"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <br></br>
          {/*si errorMessage no es un valor falsey (vacio), haz el div con el mensaje*/}
          {errorMessage && <Typography variant="body2" style={{ color: '#99220f' }}>{errorMessage}</Typography>}
        </Box>

      </Container>
    </ThemeProvider>
  );
}

