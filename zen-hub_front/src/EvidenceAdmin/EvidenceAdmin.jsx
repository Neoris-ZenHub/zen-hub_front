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
import { getUserName } from '../Functions/HomePage_Functions.js';
import { fetchEvidences, checkEvidenceFunction } from '../Functions/EvidenceAdmin_Functions.js';
import RadioButtonsAdmin from './RadioButtonAdmin.jsx';
import SearchableDropdownAdmin from './SearchableDropdownAdmin.jsx';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, // Usa el color principal del tema
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#FFFFFF",
  }));


export default function EvidenceAdmin() {

    const [userName, setUsername] = useState("");
    const [groupField, setGroupField] = useState("Global");
    const [orderField, setOrderField] = useState("Antiguo")
    const [userSearch, setUserSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [evidences, setEvidences] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [open, setOpen] = useState(false);

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
        const fetchInitialEvidences = async () => {
            try {
                const response = await fetchEvidences(groupField, orderField, userSearch);
                 if (response.evidencesUser) {
                    setEvidences(response.evidencesUser);
                    setErrorMessage("");
                } else if (response.message === "User not found") {
                    setErrorMessage("Usuario no encontrado");
                } else {
                    // Convertir los datos de la imagen en una cadena Base64
                    response.evidences.forEach(evidence => {
                        const bytes = new Uint8Array(evidence.image.data);
                        const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
                        const base64Image = btoa(binary);
                        evidence.image = base64Image;
                    });
                    setEvidences(response.evidences);
                    console.log(evidences);
                    setErrorMessage("");
                }
            } catch (error) {
                if (error.message === 'Error HTTP: 403') {
                    setErrorMessage("No tienes permisos para ver esta información");
                } else {
                    console.error("Error en la solicitud fetch: ", error);
                }
            }
        };
        fetchInitialEvidences();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupField, orderField, userSearch]);

    const handlePathChange = async (newValue) => {
        if (!newValue) {
            return;
          }

        setGroupField(newValue);
      };
      
      const handleRadioChange = async (newValue) => {
        if (!newValue) {
            return;
          }
        setOrderField(newValue);
      };

      const handleNext = () => {
        if (currentIndex < evidences.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      };

      const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
      };

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const submitValidation = async () => {
        if (evidences[currentIndex].status === false) {
          try {
            
            await checkEvidenceFunction(evidences[currentIndex].id_evidence, progress, evidences[currentIndex].course);
            
              setEvidences(prevEvidences => 
                prevEvidences.map((evidence, index) => 
                  index === currentIndex ? {...evidence, status: true} : evidence
                )
              );
              setCurrentIndex(prevIndex => prevIndex);
             alert('Evidencia verificada correctamente')
          } catch (error) {
            console.error('Error al verificar la evidencia:', error);
          }
        } else {
          alert('La evidencia ya ha sido verificada.');
          console.log('La evidencia ya ha sido verificada.');
        }
      }

      if (errorMessage === "No tienes permisos para ver esta información") {
        return (
            <ThemeProvider theme={theme}>
            <CSSBaseline />
            <ResponsiveAppBar />
              <Grid item xs={9} md={9}>
                <Item sx={{ height: '825px', margin: '8px'}}>
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <div>Contenido solo para Admins</div>
                  </Box>
                </Item>
              </Grid>
            </ThemeProvider>
            );
          }

      if (!evidences.length) {
        return (
        <ThemeProvider theme={theme}>
        <CSSBaseline />
        <ResponsiveAppBar />
          <Grid item xs={9} md={9}>
            <Item sx={{ height: '825px', margin: '8px'}}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <div>No evidences to validate</div>
              </Box>
            </Item>
          </Grid>
        </ThemeProvider>
        );
      }
    
      const currentItem = evidences[currentIndex];
      const imageSrc = `data:image/png;base64,${currentItem.image}`;


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
                sx={{ marginLeft: '2%', width: '52px', height: '52px'}}/>
            <strong style={{marginLeft: '6%', marginTop: '2.5%', fontSize: '25px'}}>{userName}</strong>
            </article>
            <div style = {{display: 'flex', justifyContent: 'center', marginTop: '90%', marginRight: '35%' }}>
            <Box marginTop = {'-100%'}>
                <strong style={{ fontSize: '22px'}}> Global o por Path:</strong>
                <Box marginTop = {'5%'}>
                <SearchableDropdownAdmin 
                    onPathChange = {handlePathChange}
                />
                </Box>
            </Box>
            </div>
            <div style = {{display: 'flex', justifyContent: 'center', marginTop: '-25%' }}>
            <Box marginRight = {'52.5%'}>
                <RadioButtonsAdmin 
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
        <Item sx={{ height: '745px', margin: '8px', display: 'flex', flexDirection: 'column'}}>
            <div style = {{display: 'flex', justifyContent: 'center'}}>
            <div>
                <h1 style={{marginTop: '40px'}}>Usuario: {currentItem.username}</h1>
                <h2 style={{marginBottom: '-60px'}}>Curso: {currentItem.course}</h2>
                <Box sx={{ height: '25px', marginTop: '2%', display: 'flex', justifyContent: 'center' }}>
                <strong style={{ fontSize: '22px', textAlign: 'center', marginTop: "70px"}}>
                    {errorMessage}
                </strong>
                </Box>
                <div style={{width: '100%', position: 'relative', height: '520px'}}>
                <div onClick={handleClickOpen}>
                  <img src={imageSrc} alt="Uploaded file" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'contain'}} />
                </div>
              </div>

              <Dialog open={open} onClose={handleClose}>
                <img src={imageSrc} alt="Uploaded file" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
              </Dialog>
                </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-3%', marginLeft: '35.5%', width: '30%' }}>
                <TextField
                    label="Progreso"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                    style={{ width: '260px' }}
                />
                <Button variant="contained" onClick={submitValidation}>
                    Submit
                </Button>
            </div>
            <div style={{ position: 'relative' }}>
            {currentItem.status && (
              <p style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center' }}>
              Esta evidencia ya ha sido calificada.
            </p>
            )}
            <div style = {{display: 'flex', justifyContent: 'space-between', marginLeft: '7%', marginRight: '7%', marginTop: '2.25%'}}>
              <Button variant="contained" onClick={handlePrevious} startIcon={<ArrowBackIcon />}>
                Anterior
              </Button>
              <Button variant="contained" onClick={handleNext} endIcon={<ArrowForwardIcon />}>
                Siguiente
              </Button>
            </div>
          </div>
        </Item>
        </Grid>


            </Grid>
        </Box>
        </ThemeProvider>
    );

}