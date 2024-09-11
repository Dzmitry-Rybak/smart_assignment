import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './types.ts';


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
