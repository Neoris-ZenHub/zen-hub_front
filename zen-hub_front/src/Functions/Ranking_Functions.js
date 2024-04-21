//Obtener Todos los Paths
export const getAllPaths = async () => {
    try{
    //URL del Endpoint
    const HomePageRandomPathURL = `http://localhost:4000/path/all`;
        
    //Obtener Token del LocalStorage
    const token = localStorage.getItem('token');

    //Mandar Token a la API
    const data = await fetch (HomePageRandomPathURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!data.ok) {
        throw new Error(`Error HTTP: ${data.status}`);
    }

    const response = await data.json();

    const {paths} = response

    const allPaths = paths.map((path) => path.name);

    return allPaths;

    } catch (error) {
        console.error("Error en la solicitud fetch: ", error);
        return ["Prueba", "Prueba 2", "Prueba 3", "Prueba 4"];
    }
}

export const fetchRanking = async (sortField, orderField, userSearch) => {
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
    return await data.json();
} 