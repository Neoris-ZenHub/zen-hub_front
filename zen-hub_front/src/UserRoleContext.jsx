import { createContext, useState, useEffect } from 'react';
import { getUserRole } from './Functions/AppBar_Functions';

export const UserRoleContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserRoleProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

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
    return (
        <UserRoleContext.Provider value={userRole}>
            {children}
        </UserRoleContext.Provider>
    );
};