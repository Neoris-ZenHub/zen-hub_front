
// Manda la Información del Login a la API para verificar la informacion
export const Login_Function = async (email, password) => {
    try{
    //URL del Login
    const LoginURL = 'http://localhost:4000/users/login';

    //Mandar Email y Password a la API
    const data = await fetch(LoginURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    if (!data.ok) {
        throw new Error(`Error HTTP: ${data.status}`);
    }

    const response = await data.json();

    //Guardar Token en LocalStorage
    localStorage.setItem('token', response.token)


    console.log("Datos enviados a la API");

    } catch (error) {
        console.error("Error en la solicitud fetch: ", error);
        alert("Error en la solicitud fetch: " + error.message);
    }
};