export const SignUp_Function = async (name, last_name, username, email, password) => {
    try {
        //URL del Signup
        const SignUpURL = 'http://localhost:4000/users/';

        //Mandar los Datos a la API
        const data = await fetch(SignUpURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, last_name: last_name, username: username, email: email, password: password})
        });

        const response = await data.json();

        // Si el servidor devuelve un estado que no es 200, lanza un error
        if (data.status !== 200) {
            throw new Error(response.message);
        }

        //Guardar Token en LocalStorage
        localStorage.setItem('token', response.token)

        console.log("Datos enviados a la API");

        // Devolver la respuesta
        return response;

    } catch (error) {
        console.error("Error en la solicitud fetch: ", error);
        // Devolver el error
        throw error;
    }
};