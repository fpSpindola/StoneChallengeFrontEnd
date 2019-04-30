import {API} from './base';
import {alertError, alertSuccess} from '../helpers';


export default class APIHelper {


    static get = (path, showAlert) => {
        return new Promise((resolve, reject) => {
            API.get(path)
                .then(response => {
                    if (showAlert && response.data.msg) alertSuccess(response.data.msg);
                    resolve(response.data)
                })
                .catch(error => {
                    if (showAlert && error.response.data.msg) alertError(error.response.data.msg);
                    reject(error.response.data)
                })
        });
    };

    static post = (path, data, showAlert, timeout=60 * 1000) => {
        return new Promise((resolve, reject) => {
            API.post(path, {...data}, {timeout: timeout})
                .then(response => {
                    if (showAlert && response.data.msg) alertSuccess(response.data.msg);
                    resolve(response.data)
                })
                .catch(error => {
                    if (showAlert && error.response.data.msg) alertError(error.response.data.msg);
                    reject(error.response.data)
                })
        });
    };
}