export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export interface Filters {
    name: string;
    username: string;
    email: string;
    phone: string;
}

export interface RootState {
    dataFromServer: User[];
    filters: Filters;
    isLoadingUsers: boolean;
}

export const DATA_FETCHING = 'DATA_FETCHING' as const;
export const DATA_FETCHED = 'DATA_FETCHED' as const;
export const FETCHED_ERROR = 'FETCHED_ERROR' as const;
export const FILTER = 'FILTER' as const;

interface DataFetchingAction {
    type: typeof DATA_FETCHING;
    payload: boolean;
}

interface DataFetchedAction {
    type: typeof DATA_FETCHED;
    payload: User[];
}

interface DataFailedAction {
    type: typeof FETCHED_ERROR;
    payload: string;
}

interface FilterAction {
    type: typeof FILTER;
    payload: Partial<Filters>;
}

export type UserActions =
    | DataFetchingAction
    | DataFetchedAction
    | DataFailedAction
    | FilterAction;