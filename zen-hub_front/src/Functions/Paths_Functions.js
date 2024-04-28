export const getCoursesbyPath = async (path) => {
    try{

        const coursesPathURL = `http://localhost:4000/course/path?name_path=${encodeURIComponent(path)}`

        const token = localStorage.getItem('token');

        const response = await fetch(coursesPathURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return await response.json();

    } catch (error){
        console.error("Error en la solicitud fetch: ", error);
    }
}


export const pathsAssignment = async (path) => {
    try{

        const pathAssignmentURL = `http://localhost:4000/users-paths/`;

        const token = localStorage.getItem('token');

        const data = await fetch(pathAssignmentURL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pathName: path
            })
    });
            const response = await data.json();
        
            return { ok: data.ok, ...response }; // Devuelve la respuesta incluso si no es exitosa
        } catch (error) {
            console.error("Error en la solicitud fetch: ", error);
            throw error;
        }
};