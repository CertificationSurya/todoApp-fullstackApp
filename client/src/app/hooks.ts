import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'


// from now on we have to use 'useAppSelector' and 'useAppDispatch' in the place of 'useSelector' and 'useDispatch'
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch= () => useDispatch<AppDispatch>()