import { createContext, useState, useEffect } from 'react';
import { getUserRole } from './Functions/AppBar_Functions';
import { getUserName } from './Functions/HomePage_Functions';

export const UserInfoContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserInfoProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);
    const [userName, setUsername] = useState("");

    const getUser = () => {
        const token = localStorage.getItem('token');
      
        if (!token) {
          return null;
        }
        return token;
      };

      useEffect(() => {
        const fetchUserRole = async () => {
            // Verifica si el usuario ha iniciado sesión
            const user = getUser();
    
            if (user) {
                try {
                    const role = await getUserRole();
                    setUserRole(role);
                } catch (error) {
                    console.error('Error obteniendo el rol del usuario:', error);
                }
            }
        };
    
        fetchUserRole();
    }, []);

        useEffect(() => {
            const fetchUserName = async () => {
                // Verifica si el usuario ha iniciado sesión
                const user = getUser();
        
                if (user) {
                    try {
                        const name = await getUserName();
                        setUsername(name);
                    } catch (error) {
                        console.error('Error obteniendo el nombre del usuario:', error);
                    }
                }
            };
        
            fetchUserName();
        }, []);

    return (
        <UserInfoContext.Provider value={{userRole, userName}}>
            {children}
        </UserInfoContext.Provider>
    );
};