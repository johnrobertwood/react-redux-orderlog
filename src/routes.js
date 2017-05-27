import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import OrdersPage from './components/order/OrdersPage';
import ManageOrderPage from './components/order/ManageOrderPage';
import CreateOrderPage from './components/order/CreateOrderPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={OrdersPage} />
    <Route path="orders" component={OrdersPage} />
    <Route path="order" component={CreateOrderPage} />
    <Route path="order/:id" component={ManageOrderPage} />
    <Route path="about" component={AboutPage} />
  </Route>
);