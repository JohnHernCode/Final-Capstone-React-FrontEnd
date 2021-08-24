import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AddTrack from '../pages/AddTrack';
import EditTrack from '../pages/EditTrack';
import TrackList from '../pages/TrackList';
import TrackItems from '../pages/TrackItems';
import More from '../pages/More';
import AdminHome from '../pages/AdminHome';
import AdminAddItem from '../pages/AdminAddItem';
import AdminEditItem from '../pages/AdminEditItem';
import LoginState from '../components/LoginState';
import Progress from '../pages/Progress';

const AppRoutes = () => (
  <BrowserRouter>
    <div className="whole-container">
      <LoginState />
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" render={(props) => (<LoginPage history={props.history} />)} />
          <Route exact path="/Signup" render={(props) => (<SignupPage history={props.history} />)} />
          <Route exact path="/track/create" render={(props) => (<AddTrack history={props.history} />)} />
          <Route exact path="/tracks/:id" component={TrackItems} />
          <Route exact path="/track/:id/edit" component={EditTrack} />
          <Route exact path="/tracks" component={TrackList} />
          <Route exact path="/progress" component={Progress} />
          <Route exact path="/more" component={More} />
          <Route exact path="/admin" component={AdminHome} />
          <Route exact path="/admin/item/create" component={AdminAddItem} />
          <Route exact path="/admin/item/:id" component={AdminEditItem} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);

AppRoutes.propTypes = {
  history: PropTypes.instanceOf(Object),
};

AppRoutes.defaultProps = {
  history: null,
};
export default AppRoutes;
