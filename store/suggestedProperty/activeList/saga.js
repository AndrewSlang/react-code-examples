import { takeLatest, fork, put, all, call } from 'redux-saga/effects';

import { FETCH_SUGGESTED_PROPERTY_ACTIVE_LIST } from './actionTypes';
import {
    fetchSuggestedPropertyActiveListSuccess,
    fetchSuggestedPropertyActiveListError,
} from './actions';

import { API } from '../../../../api';
import { PROPERTY_TYPE_SUGGESTED } from '../../../../consts/property';
import { getMapRequestParams } from '../../../../utils/request';

function* fetchProperties({ payload: { params } }) {
    try {
        let initialParams = {
            includes: ['city', 'city.region', 'myReceivedLink', 'myReceivedLink.sender', 'myReceivedLink.sender.company'],
            filter: {
                types: [PROPERTY_TYPE_SUGGESTED],
                leads_links_statuses: ['unconfirmed', 'active'],
            },
        };

        const requestParams = getMapRequestParams(params, initialParams);

        const response = yield call(API.property.getPropertyList, requestParams);

        const { data } = response;
        yield put(fetchSuggestedPropertyActiveListSuccess(data));

    } catch (error) {
        const message = error.response?.data?.message ? error.response.data.message : 'Server Error';
        yield put(fetchSuggestedPropertyActiveListError(message));
    }
}

export function* watchPropertiesFetch() {
    yield takeLatest(FETCH_SUGGESTED_PROPERTY_ACTIVE_LIST, fetchProperties)
}

function* listSaga() {
    yield all([
        fork(watchPropertiesFetch),
    ]);
}

export default listSaga;