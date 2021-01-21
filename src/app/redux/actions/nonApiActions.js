import { PAGE_REFRESHING_RESPONSE } from './actionTypes';

export const pageRefreshing = (data) =>({
   type: PAGE_REFRESHING_RESPONSE,
   response: data
})
