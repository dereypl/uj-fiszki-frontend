import React from 'react';
import StylesProvider from "./ui-config/StylesProvider";
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Dashboard from "./components/view/protected/Dashboard";
import LoginForm from "./components/view/public/Login";
import PrivateRoute from "./routes/PrivateRoute";
import {ROUTES} from "./routes/index.js";

export const App = () => {
    return (
        <StylesProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path={ROUTES.PUBLIC.LOGIN} element={<LoginForm/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path={ROUTES.PROTECTED.DASHBOARD} element={<Dashboard/>}/>
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </StylesProvider>
    );
}

export default App;
