import React, {useEffect} from 'react';
import {useAppSelector} from "../../hooks";
import {Car} from "./Car";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {carActions} from "../../store/slices/carSlice";

const Cars = () => {
    const {cars} = useAppSelector(state => state.cars);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(carActions.getAll())
    }, []);
    return (
        <div>
            {cars.map(car=><Car key={car.id} car={car}/>)}
        </div>
    );
};

export {Cars};

