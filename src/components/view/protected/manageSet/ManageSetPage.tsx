import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "../../../shared/Header";
import {AppWrapper} from '../protected.styles';
import SetService from "../../../../database/SetService";
import {TSet} from "../../../../database/DataTypes";
import Loader from "../../../shared/Loader";

const ManageSetPage = () => {
    const {id} = useParams()
    const [set, setSet] = useState<TSet | null>(null)
    const [loading, setLoading] = useState(false)

    const loadData = async () => {
        setLoading(true)
        const data = await SetService.getOne(id) as TSet;
        console.log({data});
        setSet(data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [id])

    return (
        <AppWrapper>
            <Header/>
            {loading
                ? <Loader/>
                : <>
                    <h2>Edycja zbioru</h2>
                    <h3>{set?.name}</h3>
                </>
            }

        </AppWrapper>
    );
};

export default ManageSetPage;