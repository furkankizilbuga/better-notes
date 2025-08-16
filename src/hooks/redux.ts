import type { TAppDispatch, TRootState } from "@/store";
import { useSelector } from "react-redux";
import { useDispatch, type TypedUseSelectorHook } from "react-redux";

type TDispatchFunc = () => TAppDispatch
export const useAppDispatch: TDispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;