/*
 * @flow
 */
import React from 'react';

import { Route, Switch } from 'react-router';
import AsyncComponent from './core/AsyncComponent';

const LoginPage = () => <AsyncComponent load={() => import('./pages/Login')} />;
// const RegisterPage = () => <AsyncComponent load={() => import('./pages/RegisterPage')} />;
const FindPassWord = () => <AsyncComponent load={() => import('./pages/FindPassWord')} />;
// const Shoueye = () => <AsyncComponent load={() => import('./pages/shouye')} />;
// const Lottery = () => <AsyncComponent load={() => import('./pages/Lottery')} />;
// const OrderInfo = () => <AsyncComponent load={() => import('./pages/OrderInfo')} />;
const NoMatch = () => <AsyncComponent load={() => import('./pages/NoMatch')} />;
// const BaseInfo = () => <AsyncComponent load={() => import('./pages/BaseInfo')} />;
// const NewLottery = () => <AsyncComponent load={() => import('./pages/NewLottery')} />;
// const CommonHeader = () => <AsyncComponent load={() => import('./pages/CommonHeader')} />;
const HelpCenter = () => <AsyncComponent load={() => import('./pages/HelpCenter')} />;
// const FundManagement = () => <AsyncComponent load={() => import('./pages/FundManagement')} />;
const MobilePage = () => <AsyncComponent load={() => import('./pages/MobilePage/MobilePage')} />;

// import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
// import FindPassWord from './pages/FindPassWord';
import Shoueye from './pages/shouye';
import Lottery from './pages/Lottery';
import OrderInfo from './pages/OrderInfo';
// import NoMatch from './pages/NoMatch';
import BaseInfo from './pages/BaseInfo';
import NewLottery from './pages/NewLottery';
import CommonHeader from './pages/CommonHeader';
// import HelpCenter from './pages/HelpCenter';
import FundManagement from './pages/FundManagement'
// import MobilePage from './pages/MobilePage/MobilePage';
import RootContainer from './RootContainer';


const routes = (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={RegisterPage} />
    <Route path="/home-page" component={Shoueye} />
    <Route path="/find-password" component={FindPassWord} />
    <Route path="/lottery" component={Lottery} />
    <Route path="/order-info" component={OrderInfo} />
    <Route path="/base-info" component={BaseInfo}/>
    <Route path="/new-lottery" component={NewLottery}/>
    <Route path="/user-info" component={CommonHeader} />
    <Route path="/help-center" component={HelpCenter} />
    <Route path="/fund-manager" component={FundManagement}/>
    <Route path="/mobile-page" component={MobilePage}/>
    <Route path="/ios-explain" component={''}/>
    <Route component={NoMatch} />
  </Switch>
);

export default routes;
