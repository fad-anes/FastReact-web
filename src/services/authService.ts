import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 

export const login = async (email: string, password: string) => {
  const response = await axios.post(API_URL+"/login", { email, password });
  return response.data; 
};

export const register = async (email: string, password: string,username: string) => {
    const response = await axios.post(API_URL+"/users", { email, password,username });
    return response.data; 
  };
