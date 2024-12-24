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
