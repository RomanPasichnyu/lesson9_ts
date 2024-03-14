import React, {useEffect} from 'react';
import css from './Header.module.css'
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {authService} from "../../services";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {authActions} from "../../store/slices/authSlice";

const Header = () => {
    const {currentUser} = useAppSelector(state => state.auth);
    const access = authService.getAccessToken();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (access && !currentUser) {
            dispatch(authActions.me())
        }
    }, []);

    return (
        <div className={css.Header}>
            <div>
                <h1>Cars</h1>
            </div>
            {
                currentUser ?
                    <div>{currentUser.username}-{currentUser.last_login}</div>
                    :
                    <div className={css.tools}>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </div>
            }

        </div>
    );
};

export {Header};
