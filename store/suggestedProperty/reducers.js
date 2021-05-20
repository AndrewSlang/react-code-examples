import { combineReducers } from "redux";

import activeListReducer from './activeList/reducer';

const suggestedPropertyReducer = combineReducers({
    activeList: activeListReducer,
});

export default suggestedPropertyReducer;