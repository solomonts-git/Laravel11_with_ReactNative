import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {deleteToken, getToken} from '@/services/tokenService';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUserData = async () => {

            try {
                const token = await getToken();
               // await deleteToken();
                //console.log("token---",token);


                if (token) {
                    const response = await axios.get("http://192.168.56.1:8000/api/user", {
                      headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                      }
                    });
                    
            //console.log("My Usercontext",response.data)
                setUser(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setLoading(false)
            }
        }
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{user, loading}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider};