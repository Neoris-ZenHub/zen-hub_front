export const getRandomStoreItems = async () => {
    const storeItemsURL = `http://localhost:4000/sprite/random`;

    const token = localStorage.getItem('token');

    const data = await fetch(storeItemsURL, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    });
    if (!data.ok) {
    throw new Error(`Error HTTP: ${data.status}`);
    }
    const {sprites} = await data.json();

    return sprites;
} 

// Recibe el Username del Usuario y lo muestra en el Avatar
export const getNeorimas = async () => {
    try{
    //URL del Endpoint
    const HomePageUserNameURL = `http://localhost:4000/users/homepage/`;

    //Obtener Token del LocalStorage
    const token = localStorage.getItem('token');

    //Mandar Token a la API
    const data = await fetch (HomePageUserNameURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!data.ok) {
        throw new Error(`Error HTTP: ${data.status}`);
    }

    const response = await data.json();

    const {neorimas} = response

    return neorimas;

    } catch (error) {
        console.error("Error en la solicitud fetch: ", error);
        return "Sin registro de Neorimas";
    }
};

export const buyingSprites = async (spriteId) => {
    try {
      const buySpriteURL = `http://localhost:4000/sprite/`;
  
      const token = localStorage.getItem('token');
  
      const data = await fetch(buySpriteURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id_sprite: spriteId,
        }),
      });
  
      const response = await data.json();
  
      return { ok: data.ok, ...response }; // Devuelve la respuesta incluso si no es exitosa
    } catch (error) {
      console.error("Error en la solicitud fetch: ", error);
      throw error;
    }
  };