import React from 'react';
import StylesProvider from "./ui-config/StylesProvider";
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import DashboardPage from "./components/view/protected/dashboard/DashboardPage";
import SignIn from "./components/view/public/SignIn";
import PrivateRoute from "./routes/PrivateRoute";
import {ROUTES} from "./routes/index.js";
import SignUpForm from "./components/view/public/SignUp";
import ForgotPassword from "./components/view/public/ResetPassword";
import ManageSetPage from "./components/view/protected/manageSet/ManageSetPage";
import LearnSetPage from "./components/view/protected/learnSet/LearnSetPage";
import MiniGamePage from './components/view/protected/dashboard/MiniGame';

export const App = () => {
    return (
        <StylesProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path={ROUTES.PUBLIC.LOGIN} element={<SignIn/>}/>
                        <Route path={ROUTES.PUBLIC.REGISTRATION} element={<SignUpForm/>}/>
                        <Route path={ROUTES.PUBLIC.PASSWORD_RESET} element={<ForgotPassword/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path={ROUTES.PROTECTED.DASHBOARD} element={<DashboardPage/>}/>
                            <Route path={`${ROUTES.PROTECTED.MANAGE_SET}/:id`} element={<ManageSetPage/>}/>
                            <Route path={`${ROUTES.PROTECTED.LEARN_SET}/:id`} element={<LearnSetPage/>}/>
                            <Route path={`${ROUTES.PROTECTED.MINIGAME}/:id`} element={<MiniGamePage/>}/>
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </StylesProvider>
    );
}

export default App;
