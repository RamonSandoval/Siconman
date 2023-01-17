import axios from 'axios';


export default class Conection {

    static bd_url = 'http://localhost:1337';

    static securityConfig() {
        const token = localStorage.getItem('token');

         return {
             headers: {
                 'Authorization': `9b802 ${token}`,
                 'Content-Type': 'application/json'
             }
         }
    }
    static async GET(url) {
        return await (await axios.get(this.bd_url + url, this.securityConfig())).data;
    }
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