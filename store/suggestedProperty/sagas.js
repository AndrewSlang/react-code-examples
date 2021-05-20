import { all } from 'redux-saga/effects';

import activeListSaga from './activeList/saga';

function* suggestedPropertySaga() {
    yield all([
        activeListSaga(),
    ])
}

export default suggestedPropertySaga;