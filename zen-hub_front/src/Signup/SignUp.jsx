import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import '../App.css';
import NeorisIconLight from '../images/NeorisLogoLight.png';
import { SignUp_Function } from '../Functions/SignUp_Functions.js';
import { theme } from '../theme.js';
import { useNavigate } from 'react-router-dom';

export default function SignUp( ) {
  
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(localStorage.getItem('errorMessage') || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(''); // Limpiar el estado de errorMessage
        localStorage.removeItem('errorMessage'); // Limpiar el mensaje de error del almacenamiento local
      }, 5000); // 5000 milisegundos = 5 segundos
  
      // Limpiar el temporizador cuando el componente se desmonte
      return () => clearTimeout(timer);
    }
  }, [errorMessage]); // Ejecutar useEffect cada vez que errorMessage cambie

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Verificar que ningun campo este vació
    if (!name || !lastName || !username || !email || !password) {
      setErrorMessage("Favor de llenar todos los campos requeridos")
      return;
    }
    try {
      const response = await SignUp_Function(name, lastName, username, email, password);
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
    
      navigate('/paths');
      window.location.reload();
    } catch (error) {
        localStorage.setItem('errorMessage', "Este correo ya está en uso");
      }
      window.location.reload();
      return;
    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx = {{ marginTop: 15 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src = {NeorisIconLight} alt = "Neoris Icon" className = "LogoNeoris"></img>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                  onChange = {(e) => setName(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: '#FFFFFF',
                      '&.Mui-focused': {
                        color: '#FFFFFF',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                  onChange = {(e) => setLastName(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: '#FFFFFF',
                      '&.Mui-focused': {
                        color: '#FFFFFF',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Nombre de Usuario"
                  name="username"
                  autoComplete="username"
                  onChange = {(e) => setUsername(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: '#FFFFFF',
                      '&.Mui-focused': {
                        color: '#FFFFFF',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                  onChange = {(e) => setEmail(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: '#FFFFFF',
                      '&.Mui-focused': {
                        color: '#FFFFFF',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange = {(e) => setPassword(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: '#FFFFFF',
                      '&.Mui-focused': {
                        color: '#FFFFFF',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: '#FFFFFF', backgroundColor: '#1B242A' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href ="/" variant="body2" sx = {{color: '#FFFFFF'}}>
                  Ya tienes una cuenta? Inicia Sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
          <br></br>
          {/*si errorMessage no es un valor falsey (vacio), haz el div con el mensaje*/}
          {errorMessage && <Typography variant="body2" style={{ color: '#AF1212' }}>{errorMessage}</Typography>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}