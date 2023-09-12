import axios from "axios";


const instance = axios.create({
    baseURL: 'https://store-f5372-default-rtdb.europe-west1.firebasedatabase.app'

});


export default instance;