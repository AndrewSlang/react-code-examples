import {
    FETCH_SUGGESTED_PROPERTY_ACTIVE_LIST,
    FETCH_SUGGESTED_PROPERTY_ACTIVE_LIST_SUCCESS,
    FETCH_SUGGESTED_PROPERTY_ACTIVE_LIST_ERROR,
    CLEAN_SUGGESTED_PROPERTY_ACTIVE_LIST,

    SUGGESTED_PROPERTY_ACTIVE_LIST_SET_FILTER,
    SUGGESTED_PROPERTY_ACTIVE_LIST_RESET_FILTER,

    SUGGESTED_PROPERTY_ACTIVE_LIST_SET_SORT,
    SUGGESTED_PROPERTY_ACTIVE_LIST_RESET_SORT,

    SUGGESTED_PROPERTY_ACTIVE_LIST_SET_PAGE,
} from './actionTypes';

export const fetchSuggestedPropertyActiveList = (params) => {
    return {
        type: FETCH_SUGGESTED_PROPERTY_ACTIVE_LIST,
        payload: { params }
    }
};

export const fetchSuggestedPropertyActiveListSuccess = (data) => {
    return {
        type: FETCH_SUGGESTED_PROPERTY_ACTIVE_LIST_SUCCESS,
        payload: data,
    }
};

export const fetchSuggestedPropertyActiveListError = (data) => {
    return {
        type: FETCH_SUGGESTED_PROPERTY_ACTIVE_LIST_ERROR,
        payload: data,
    }
};

export const cleanSuggestedPropertyActiveList = () => {
    return { type: CLEAN_SUGGESTED_PROPERTY_ACTIVE_LIST };
};


// SET PROPERTY FILTER
export const suggestedPropertyActiveListSetFilter = (data) => {
    return {
        type: SUGGESTED_PROPERTY_ACTIVE_LIST_SET_FILTER,
        payload: data,
    }
};

export const suggestedPropertyActiveListResetFilter = () => {
    return { type: SUGGESTED_PROPERTY_ACTIVE_LIST_RESET_FILTER };
};


// SET PROPERTY SORTING
export const suggestedPropertyActiveListSetSort = (data) => {
    return {
        type: SUGGESTED_PROPERTY_ACTIVE_LIST_SET_SORT,
        payload: data,
    }
};

export const suggestedPropertyActiveListResetSort = () => {
    return { type: SUGGESTED_PROPERTY_ACTIVE_LIST_RESET_SORT };
};


// SET PROPERTY PAGE
export const suggestedPropertyActiveListSetPage = (data) => {
    return {
        type: SUGGESTED_PROPERTY_ACTIVE_LIST_SET_PAGE,
        payload: data,
    }
};