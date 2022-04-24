import React, {useEffect} from 'react';
import {useAuth} from "../../../context/AuthContext";
import Button from "../../shared/Button";
import {WordService} from "../../../database/DataService";

const Dashboard = () => {
    const {logout} = useAuth()

    const loadTestData = async () => {
        console.log(await WordService.getAll());
        console.log(await WordService.getOne('QdpLQQsQN8649uuc2w16'))
    }

    useEffect(() => {
        loadTestData()
    }, [])

    return (
        <div>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
};

export default Dashboard;