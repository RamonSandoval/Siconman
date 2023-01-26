import axios from 'axios';


export default class Conection {

    static bd_url = 'http://192.168.17.141:1337';

    static securityConfig() {
        const token = localStorage.getItem('token');

         return {
             headers: {
                 'Authorization': `9b802 ${token}`,
                 'Content-Type': 'application/json'
             }
         }
    }
    /**
     * "This function is an asynchronous function that returns the data from the url that is passed to
     * it."
     * </code>
     * I'm not sure if this is the best way to do this, but it works.
     * 
     * @param url The url of the request
     * 
     * @return The data from the response.
     */
    static async GET(url) {
        return await (await axios.get(this.bd_url + url, this.securityConfig())).data;
    }
    /**
     * It takes a url and a body, and returns the data from the response of a post request to the url
     * with the body and the securityConfig.
     * </code>
     * 
     * @param url The url of the API
     * @param body {
     * 
     * @return The data from the response.
     */
    static async POST(url, body) {
        return await (await axios.post(this.bd_url + url,body, this.securityConfig())).data;
    }
    static async DELETE(url, body) {
        return await (await axios.delete(this.bd_url + url,this.securityConfig()));
    }
    static async UPDATE(url, body) {
        return await (await axios.put(this.bd_url + url, body, this.securityConfig())).data;
    }

}