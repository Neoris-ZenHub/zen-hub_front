//Manda la Información del SignUp a la API para crear un nuevo usuario
export const SignUp_Function = async (name, last_name, username, password, email) => {

    //URL del Signup
    const SignUpURL = 'http://localhost:4000/users/signup';

    //Mandar los Datos a la API
    const data = await fetch(SignUpURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, last_name: last_name, username: username, password: password, email: email})
    });

    const response = await data.json();

    //Guardar Token en LocalStorage
    localStorage.setItem('token', response.token)

    console.log("Datos enviados a la API");
    alert("Usuario Creado Correctamente");

};