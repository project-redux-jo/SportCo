import axios from "axios";

const FIREBASE_URL = 'https://redux-project-791e5-default-rtdb.firebaseio.com/';


const api = axios.create({

    baseURL: FIREBASE_URL,

});


export default api;