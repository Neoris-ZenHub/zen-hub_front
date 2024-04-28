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
import IconLight from '../images/Icon-light.png';
import { getNeorimas, getRandomStoreItems } from '../Functions/Marketplace_Functions.js';
import ResponsiveAppBar from '../AppBar.jsx';
import StoreItem from './StoreItems.jsx';
import { useContext } from 'react';
import { UserInfoContext } from '../UserInfoContext.jsx';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, // Usa el color principal del tema
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#FFFFFF",
  }));

export default function MarketPlace(){

    const { userName } = useContext(UserInfoContext);
    const [neorimas, setNeorimas] = useState(0);
    const [sprites, setSprites] = useState([]);

    const fetchUserNeorimas = async () => {
        try{
            const neorimas = await getNeorimas();
            setNeorimas(neorimas);
        } catch (error){
            console.error("Error en la solicitud fetch: ", error);
        }
    };

    useEffect(() => {
        fetchUserNeorimas();
    }, []);

    useEffect(() => {
        const fetchRandomStoreItems = async () => {
            try {
                const sprites = await getRandomStoreItems();
                sprites.forEach(sprite => {
                    const bytes = new Uint8Array(sprite.sprite_image.data);
                    const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
                    const base64Image = btoa(binary);
                    sprite.sprite_image = base64Image;
                });
                setSprites(sprites);
            } catch (error) {
                console.error("Error en la solicitud fetch: ", error);
            }
        };
        fetchRandomStoreItems();
    }, []);




    return(
        <ThemeProvider theme={theme}>
        <CSSBaseline />
        <ResponsiveAppBar />
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <Item sx={{ height: '745px', margin: '8px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <article style = {{display: 'flex', alignItems: 'center', marginTop: '25px', marginLeft: "0.5%" }}>
                            <Avatar 
                                alt="User Avatar" 
                                src= {`https://unavatar.io/${userName}`} 
                                sx={{ marginLeft: '2%', width: '52px', height: '52px'}}/>
                            <strong style={{marginLeft: '10.45%', fontSize: '25px'}}>{userName}</strong>
                        </article>
                        <article style = {{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '25px', marginRight: "4.24%", backgroundColor: 'black', padding: '2px 10px', borderRadius: '5px' }}>
                            <img src={IconLight} alt="Icon Light" style={{width: '35px', height: 'auto', marginRight: '10px'}}/>
                            <p style={{fontSize: '25px', color: 'white', margin: '0', lineHeight: '1'}}>{neorimas}</p>
                        </article>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '4%'}}>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px 90px', maxWidth: '90%'}}>
                            {sprites.map((sprite) => (
                                <StoreItem 
                                    id = {sprite._id_sprite}
                                    key={sprite._id_sprite} 
                                    name={sprite.name} 
                                    image={`data:image/jpeg;base64,${sprite.sprite_image}`} 
                                    color={
                                        sprite.rarity === 'common' ? 'darkgray' : 
                                        sprite.rarity === 'rare' ? 'lightblue' : 
                                        sprite.rarity === 'legendary' ? 'darkgoldenrod' : 'silver'
                                    }
                                    cost={sprite.price}
                                    fetchUserNeorimas={fetchUserNeorimas}
                                />
                            ))}
                        </div>
                    </div>
                    
                    </Item>
                </Grid>
            </Grid>
        </Box>
    </ThemeProvider>
    )
}