
import axios from 'axios';

const strapiUrl = process.env.strapiUrl

export async function signIn({ email, password }) {
  const res = await axios.post(`http://localhost:1337/api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}
export default signIn