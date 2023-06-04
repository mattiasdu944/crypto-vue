import axios from "axios";

const cryptoApi = axios.create({
    baseURL:'https://min-api.cryptocompare.com/data'
})

export default cryptoApi;