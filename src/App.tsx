import React, {useEffect} from 'react';
import {WordService} from "./database/DataService";
import StylesProvider from "./ui-config/StylesProvider";
import LoginForm from "./components/view/public/Login";

export const App = () => {

    const loadTestData = async () => {
        console.log(await WordService.getAll());
        console.log(await WordService.getOne('QdpLQQsQN8649uuc2w16'))
    }

    useEffect(() => {
        loadTestData()
    }, [])


    console.log('render');

    return (
        <StylesProvider>
            <LoginForm/>
        </StylesProvider>
    );
}

export default App;
