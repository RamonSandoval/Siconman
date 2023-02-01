import axios from 'axios';

const strapiUrl = process.env.strapiUrl

/**
 * It sends a POST request to the Strapi server with the user's email and password. If the user's
 * credentials are valid, the server will return a JWT token
 * 
 * @return The response from the server.
 */
export async function signIn({ email, password }) {
  const res = await axios.post(`http://localhost:1337/api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}
export default signIn