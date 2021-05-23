import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../Screens/Dashboard';
import SignInScreen from '../Screens/SignInScreen';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "./Auth";
import EditorScreen from '../Screens/EditorScreen';
import Play from '../Screens/Play';

function Router() {
    return (
        <AuthProvider>
            <BrowserRouter >
            <Switch>
                <Route exact path="/" component={SignInScreen} />
                <PrivateRoute exact path="/dashboard" component={App} />
                <PrivateRoute exact path="/editor" component={EditorScreen} />
                <PrivateRoute exact path="/play" component={Play} />
            </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default Router;