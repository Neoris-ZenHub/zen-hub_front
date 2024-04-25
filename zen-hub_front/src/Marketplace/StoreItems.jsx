/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import IconDark from '../images/Icon-dark.png';
import { Button } from '@mui/material';
import { buyingSprites } from '../Functions/Marketplace_Functions';
import '../App.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, // Usa el color principal del tema
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: "#FFFFFF",
}));

export default function StoreItem({ id, name, image, color, cost, fetchUserNeorimas }){

    const handleBuy = async () => {
        try {
          const response = await buyingSprites(id);
      
          if (response.message === "Sprite bought successfully") {
            alert("Compra Exitosa!");
            fetchUserNeorimas();
          }else if (response.message === "Sprite already bought") {
              alert("Ya tienes este sprite");
          } else if (response.message === "Insufficient neorimas to complete purchase") {
            alert("No tienes suficientes Neorimas");
          } else {
            alert("Ocurrió un error al intentar completar la compra");
          }
        } catch (error) {
          console.error("Error al comprar sprite: ", error.message);
        }
      };

    return (
        <Item style={{backgroundColor: color, width: '250px', height: '230px', borderRadius: '10px'}}>
            <img src={image} alt={name} style={{height: '70px', width: 'auto', marginTop: '30px'}}/>
            <h3>{name}</h3>
            <Button variant="contained" onClick = {handleBuy} style={{backgroundColor: 'white', color: '#060606', width: '80%', height: '40px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p>{cost}</p>
                    <img src={IconDark} alt="Icon Light" style={{width: '20px', height: 'auto', marginLeft: '10px'}}/>
                </div>
            </Button>
        </Item>
    );
}

