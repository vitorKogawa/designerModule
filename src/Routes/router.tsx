import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeScreen } from '../Screens/HomeScreen/HomeScreen'; //homepage
import SignInScreen from '../Screens/SignInScreen';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "./Auth";
import EditorScreen from '../Screens/EditorScreen';
import Play from '../Screens/Play';

import { DASHBOARD_ROUTES } from './config/DashboardRoutes'
import { IDashboardRoutes } from './config/interfaces/IRoutes';


//teste
import { PlayScreen } from './../Screens/PlayScreen/index'

const Router:React.FC = () => {
    return (
        <AuthProvider>
            <BrowserRouter >
                <Switch>
                    <Route exact path="/" component={SignInScreen} />
                    <PrivateRoute exact path="/home" component={HomeScreen} />
                    <PrivateRoute exact path="/editor" component={EditorScreen} />
                    <PrivateRoute exact path="/play" component={Play} />
                    {
                        DASHBOARD_ROUTES.map((route: IDashboardRoutes, index: number) => <Route path={route.pathRoute} component={route.componentRoute} key={`dashboardRoute-${index}`} />)
                    }
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default Router;