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

import { SUGGEST_FILTER_INITIAL_VALUES } from '../../../../consts/suggest';

const initialState = {
    list: [],
    listLoading: false,
    listError: null,
    page: 1,
    meta: null,

    filter: {
        isActive: false,
        values: SUGGEST_FILTER_INITIAL_VALUES,
    },
    sort: [],
};

const list = (state = initialState, action) => {
    switch (action.type) {

        // PROPERTY LIST
        case FETCH_SUGGESTED_PROPERTY_ACTIVE_LIST:
            state = {
                ...state,
                listLoading: true,
                listError: null,
            };
            break;

        case FETCH_SUGGESTED_PROPERTY_ACTIVE_LIST_SUCCESS:
            state = {
                ...state,
                listLoading: false,
                list: action.payload.data,
                meta: action.payload.meta,
            };
            break;

        case FETCH_SUGGESTED_PROPERTY_ACTIVE_LIST_ERROR:
            state = {
                ...state,
                listLoading: false,
                listError: action.payload,
            };
            break;

        case CLEAN_SUGGESTED_PROPERTY_ACTIVE_LIST:
            state = {
                ...state,
                ...initialState,
            };
            break;


        // PROPERTY FILTER
        case SUGGESTED_PROPERTY_ACTIVE_LIST_SET_FILTER:
            state = {
                ...state,
                filter: {
                    isActive: true,
                    values: {
                        ...initialState.filter.values,
                        ...action.payload,
                    },
                },
                page: initialState.page,
            };
            break;

        case SUGGESTED_PROPERTY_ACTIVE_LIST_RESET_FILTER:
            state = {
                ...state,
                filter: initialState.filter,
                page: initialState.page,
            };
            break;


        // PROPERTY SORT
        case SUGGESTED_PROPERTY_ACTIVE_LIST_SET_SORT:
            state = {
                ...state,
                sort: action.payload,
                page: initialState.page,
            };
            break;

        case SUGGESTED_PROPERTY_ACTIVE_LIST_RESET_SORT:
            state = {
                ...state,
                sort: initialState.sort,
                page: initialState.page,
            };
            break;

        // PROPERTY SET PAGE
        case SUGGESTED_PROPERTY_ACTIVE_LIST_SET_PAGE:
            state = {
                ...state,
                page: action.payload,
            };
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
};

export default list;