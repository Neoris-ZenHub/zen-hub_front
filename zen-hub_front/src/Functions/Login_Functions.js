
// Manda la Información del Login a la API para verificar la informacion
export const Login_Function = async (email, password) => {

    //URL del Login
    const LoginURL = 'http://localhost:4000/users/';

    //Mandar Email y Password a la API
    const data = await fetch(LoginURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    const response = await data.json();

    //Guardar Token en LocalStorage
    localStorage.setItem('token', response.token)


    console.log("Datos enviados a la API");
    alert("Enviado Correctamente");
};