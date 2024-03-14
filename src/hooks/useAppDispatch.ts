import {useDispatch} from "react-redux";
import {AppDispatch} from "../types";

const useAppDispatch = ()=> useDispatch<AppDispatch>()

export {
    useAppDispatch
}