import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 

export const allusers = async () => {
  const token = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/users`, config);
  return response.data;
};

export const toggle_user_status = async (user_id: number) => {
  const token = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/users/toggle_status/${user_id}`, {}, config);
  return response.data;
};


export const createProduct = async (formData: FormData) => {
  const token = localStorage.getItem('access_token'); 

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data', 
      Authorization: `Bearer ${token}`, 
    },
  };

  
    const response = await axios.post(`${API_URL}/products`, formData, config);
    return response.data; 
 
};

export const updateProduct = async (formData: FormData,product_id:number) => {
  const token = localStorage.getItem('access_token'); 

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data', 
      Authorization: `Bearer ${token}`, 
    },
  };

  
    const response = await axios.put(`${API_URL}/products/${product_id}`, formData, config);
    return response.data; 
};

export const getUserProducts = async () => {
  const token = localStorage.getItem('access_token'); 

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };
    const response = await axios.get(`${API_URL}/products/user`, config);
    return response.data; 
};

export const getAllProducts = async () => {
  const token = localStorage.getItem('access_token'); 

  const config = {
    headers: { 
      Authorization: `Bearer ${token}`, 
    },
  };
    const response = await axios.get(`${API_URL}/products`, config);
    return response.data; 
};

export const deleteProduct = async (product_id:number) => {
  const token = localStorage.getItem('access_token'); 

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };
    const response = await axios.delete(`${API_URL}/products/${product_id}`, config);
    return response.data; 
};
