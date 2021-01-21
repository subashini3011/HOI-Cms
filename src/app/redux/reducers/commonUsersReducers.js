import {
    GET_COMMON_USERS,
    GET_COMMON_USERS_RESPONSE,

}
    from '../actions/actionTypes';

const initialState ={

}

export default function(state=initialState,action){
    switch(action.type){
        case GET_COMMON_USERS:
            return {
                ...state,
                isLoading:true,
            };
        case GET_COMMON_USERS_RESPONSE:
            return {
                ...state,
                isLoading:false,
                commonUsersResponse: action.response
            };
       
        default:
            return state;
    }
}