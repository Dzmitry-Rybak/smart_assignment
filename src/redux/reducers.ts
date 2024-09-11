import { User, Filters, UserActions } from '../types/types.ts';

import {
    DATA_FETCHING,
    DATA_FETCHED,
    FILTER
} from './actions.ts'

interface UserState {
    isLoadingUsers: boolean;
    dataFromServer: User[];
    numberOfUsers: number;
    filters: Filters;
}

const initialDataState: UserState = {
    isLoadingUsers: true,
    dataFromServer: [],
    numberOfUsers: 0,
    filters: {
        name: '',
        username: '',
        email: '',
        phone: '',
    }
}

export const usersReducer = (state = initialDataState, action: UserActions): UserState => {
    switch(action.type) {
        case DATA_FETCHING: {
            return {
                ...state,
                isLoadingUsers: action.payload
            }
        }
        case DATA_FETCHED: {
            return {
                ...state,
                isLoadingUsers: false,
                dataFromServer: action.payload
            }
        }
        case FILTER: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                }
            }
        }
        default:
            return state;
    }
}