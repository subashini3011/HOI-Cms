import {
    UPLOAD_FILE,
    UPLOAD_FILE_RESPONSE,
    BULK_UPLOAD,
    BULK_UPLOAD_RESPONSE,
}
    from '../actions/actionTypes';

const initialState ={
}

export default function(state=initialState,action){
    switch(action.type){

        case UPLOAD_FILE:
            return {
                ...state,
                isLoading:true,
            };

        case UPLOAD_FILE_RESPONSE:
            return {
                ...state,
                isLoading:false,
                uploadFileResponse: action.response
            };

        case BULK_UPLOAD:
            return {
                ...state,
                isLoading:true,
            };
        case BULK_UPLOAD_RESPONSE:
            return {
                ...state,
                isLoading:false,
                bulkUploadResponse: action.response
            };
        
        default:
            return state;
    }
}