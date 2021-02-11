import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import SignInScreen from '../Screens/SignInScreen';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "./Auth";
import EditorScreen from '../Screens/EditorScreen';

function Router() {
    return (
        <AuthProvider>
            <BrowserRouter >
            <Switch>
                <Route exact path="/" component={SignInScreen} />
                <PrivateRoute exact path="/dashboard" component={App} />
                <PrivateRoute exact path="/editor" component={EditorScreen} />
            </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default Router;