// Recibe el Username del Usuario y lo muestra en el Avatar
export const getUserName = async () => {
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

    const {username} = response

    return username;

    } catch (error) {
        console.error("Error en la solicitud fetch: ", error);
        return "Anonymous";
    }
};

//Obtener Path del Usuario
export const getUserPath = async () => {
    try{
    //URL del Endpoint
    const HomePageUserPathURL = `http://localhost:4000/users-paths/`;
        
    //Obtener Token del LocalStorage
    const token = localStorage.getItem('token');

    //Mandar Token a la API
    const data = await fetch (HomePageUserPathURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!data.ok) {
        throw new Error(`Error HTTP: ${data.status}`);
    }

    const response = await data.json();

    const {path} = response    

    return path;

    } catch (error) {
        console.error("Error en la solicitud fetch: ", error);
        return "I.A Generativa";
    }
}

//Obtener Path del Usuario
export const getRandomPaths = async () => {
    try{
    //URL del Endpoint
    const HomePageRandomPathURL = `http://localhost:4000/path/random`;
        
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

    const randomPaths = paths.map((path) => path.name);

    return randomPaths;

    } catch (error) {
        console.error("Error en la solicitud fetch: ", error);
        return ["Prueba", "Prueba 2", "Prueba 3", "Prueba 4"];
    }
}

//Obtener Cursos Completos y Faltantes del Path del Usuario

export const getCoursesUser = async () => {
    try{
        //URL del Endpoint
        const HomePageCoursesUserURL = `http://localhost:4000/users-courses/`;

        const token = localStorage.getItem('token');

        const data = await fetch (HomePageCoursesUserURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!data.ok) {
            throw new Error(`Error HTTP: ${data.status}`);
        }

        const response = await data.json();

        const {courses} = response

        //const coursesName = courses.map((course) => course.name);


        return courses;

    } catch (error) {
        console.error("Error en la solicitud fetch: ", error);
        console.log(error)
        return ["Curso Prueba", "Curso Prueba 2", "Curso Prueba 3", "Curso Prueba 4", "Curso Prueba 5"];
    }
}
