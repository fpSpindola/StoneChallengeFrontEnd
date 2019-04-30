import APIHelper from './helper'
import axios from 'axios';

export default class HomeAPI {
    static getFuncionarios = (showAlert=true) => {
        return APIHelper.get('/v1/funcionarios/search', showAlert)
    }
}