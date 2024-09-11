import { User, Filters } from "../types/types";

export const DATA_FETCHING = 'DATA_FETCHING';
export const DATA_FETCHED = 'DATA_FETCHED';
export const FETCHED_ERROR = 'FETCHED_ERROR';
export const FILTER = 'FILTER';

export const dataFetching = (isLoadingUsers: boolean) => ({
    type: 'DATA_FETCHING',
    payload: isLoadingUsers
});

export const dataFetched = (users: User[]) => {
    return {
        type: 'DATA_FETCHED',
        payload: users
    }
};

export const dataFailed = (error: string) => {
    return {
        type: 'FETCHED_ERROR',
        payload: error
    }
};

export const filtered = (filter: Partial<Filters>) => {
    return {
        type: 'FILTER',
        payload: filter
    }
};