import { UPLOAD_FILE, 
         UPLOAD_FILE_RESPONSE,
         BULK_UPLOAD,
         BULK_UPLOAD_RESPONSE, 
         } from './actionTypes';

    export const uploadFile = (data) =>({
        type: UPLOAD_FILE,
        data : data
    })
    
    export const uploadFileResponse = (data) =>({
        type: UPLOAD_FILE_RESPONSE,
        response: data
    })

    export const bulkUpload = (data) =>({
        type: BULK_UPLOAD,
        data : data
    })
    
    export const bulkUploadResponse = (data) =>({
        type: BULK_UPLOAD_RESPONSE,
        response: data
    })

    
