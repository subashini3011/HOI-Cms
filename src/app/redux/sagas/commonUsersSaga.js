import { call, put, takeLatest } from 'redux-saga/effects';
import * as dataAccess from '../../utils/ajax';

import actions from '../actions/actionTypes';

import {  getcommonUsersResponse} from '../actions/commonUsersActions';
import { debug } from 'util';

import { GET_COMMON_USERS } from 'constants/api-constants';

const getRequest = async (url, payload) =>
    await dataAccess.get(url, payload);
    
export function* commonUsers(data) {    
    const payload = data;
    let url =  GET_COMMON_USERS;
    try {
        const response = yield call(getRequest, url, payload);
        yield put(getcommonUsersResponse(response));
        
    } catch (error) {
        yield put(getcommonUsersResponse(error))        
    }
}

export function* commonUsersSaga() {
   yield takeLatest(actions.GET_COMMON_USERS, commonUsers)
}