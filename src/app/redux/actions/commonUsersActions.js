import { GET_COMMON_USERS, GET_COMMON_USERS_RESPONSE } from './actionTypes';

    export const getcommonUsers = (data) =>({
        type:GET_COMMON_USERS,
        data : data
    })
    export const getcommonUsersResponse = (data) =>({
        type:GET_COMMON_USERS_RESPONSE,
        response:data
    })
