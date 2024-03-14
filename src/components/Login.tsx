import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../interfaces";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {authActions} from "../store/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks";

const Login = () => {
    const {register, handleSubmit} = useForm<IAuth>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {loginError} = useAppSelector(state => state.auth);

    const login:SubmitHandler<IAuth> =  async (user) => {
        const {meta:{requestStatus}} = await dispatch(authActions.login({user}));
        if(requestStatus=='fulfilled'){
            navigate('/cars')
        }
    };
    return (
        <div>
            {loginError&& <h5>{loginError}</h5>}
            <form onSubmit={handleSubmit(login)}>
                <input type="text" placeholder={'username'} {...register('username')}/>
                <input type="text" placeholder={'password'} {...register('password')}/>
                <button>Login</button>
            </form>
        </div>
    );
};

export {Login};