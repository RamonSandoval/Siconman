import axios from 'axios';

const createUser = async (data) => {
  try {
    const response = await axios.post('http://192.168.17.141:1337/auth/local/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createUser;