export const getUserRole = async () => {
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

    const {role} = response

    return role;

    } catch (error) {
        console.error("Error en la solicitud fetch: ", error);
        return "Sin registro de Neorimas";
    }
};