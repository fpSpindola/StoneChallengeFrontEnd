import axios from "axios";

export const API = axios.create({
    baseURL: '/',
    timeout: 60 * 1000,
});

API.interceptors.request.use((config) => {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        localStorage.setItem('user', null);
    }
    if (user != null) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

API.interceptors.response.use(
    (successful_response) => {
        return successful_response
    },
    (error) => {
        if (!error.response || error.response.status >= 500) {
            let status = 500;
            let msg = "Network Error. Please verify if you're connected to the internet.";
            if (error.response) {
                status = error.response.status;
                msg = 'Server is under maintenance please try again later.';
            }
            return Promise.reject({...error, response: {data: {msg: msg, errors: {}},
                    status: status}});
        }
        return Promise.reject(error)
    }
);


window.API = API;