import axios from 'axios';
const url = "http://localhost:5001/clients";

export default class ClientService {
    
    static clientsList() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                const mappedData = await data.map(client => ({
                    name: client.name,
                    phone: client.phone,
                    email: client.email,
                    providers: client.providers
                }));
                resolve(mappedData);
            } catch (err) {
                reject (err);
            }
        });
    }

    static async createClient(text) {
        const client = await axios.post(url, text);
        if (!client) throw new Error("");
        return client;
    }

    static deleteClient(id) {
        return axios.delete(`${url}${id}`);        
    }

    static updateClient(id) {
        return axios.put(`${url}${id}`);         
    }

    static getClient(id) {
        return axios.get(`${url}${id}`);
    }

}

