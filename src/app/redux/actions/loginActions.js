import { LOGIN, 
         LOGIN_RESPONSE, 
         FORGOT_PASSWORD,
         FORGOT_PASSWORD_RESPONSE } from './actionTypes';

    export const login = (data) =>({
        type:LOGIN,
        data : data
    })
    
    export const loginResponse = (data) =>({
        type:LOGIN_RESPONSE,
        response:data
    })

    export const forgotPassword = (data) =>({
        type: FORGOT_PASSWORD,
        data : data
    })
    
    export const forgotPasswordResponse = (data) =>({
        type: FORGOT_PASSWORD_RESPONSE,
        response:data
    })