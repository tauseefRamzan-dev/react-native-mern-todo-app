import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '@env';
const AuthContext = createContext();
const initialState = { isAuth: false, user: {} };

const reducer = (state, action) => {
  const { type, payload = {} } = action;
  const { user = {} } = payload;

  switch (type) {
    case 'SET_LOGIN':
      return { isAuth: true, user };
    case 'SET_LOGOUT':
      return { isAuth: false, user: {} };
    default:
      return state;
  }
};

const Auth = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
const [isAppLoading,setIsAppLoading]=useState(true);
const handleLogout=async()=>{
  await AsyncStorage.removeItem("token")
  dispatch({type: "SET_LOGOUT", payload: {} })
}

  const readProfile=async(token)=>{
    if(!token){ setIsAppLoading(false); return; }
    await axios.get(`${API_URL}/auth/user`,{ headers: { Authorization: `Bearer ${token}` } })
        .then(({status,data})=>{
                if (status === 200) {
                    const { user } = data
                    console.log('user', user)
                    dispatch({ type: "SET_LOGIN", payload: { user } })
                }
        }).catch(error => {
                console.error("error", error.response)
                if (error.response?.data?.message === "Invalid or expired token.")
                    AsyncStorage.removeItem("token")
            })
            .finally(() => { setIsAppLoading(false) })
  }

  useEffect(()=>{
     const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        await readProfile(token);
      } catch (e) {
        setIsAppLoading(false);
      }
    };
    loadToken();
  },[])
 

  return (
    <AuthContext.Provider value={{ ...state, dispatch,readProfile,handleLogout,isAppLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default Auth;