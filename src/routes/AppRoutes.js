import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Footer from '../components/footer';
import Home from '../pages/home';
import NotFound from '../pages/404';
import LoginPage from '../pages/loginPage';
import SignupPage from '../pages/signupPage';
import addMeasure from '../pages/addMeasure';
import EditMeasure from '../pages/editMeasure';
import MeasureList from '../pages/measureList';
import MeasureSubjects from '../pages/measureSubjects';
import More from '../pages/more';
import AdminHome from '../pages/adminHome';
import AdminAddSubject from '../pages/adminAddSubject';
import AdminEditSubject from '../pages/adminEditSubject';
import LoginState from '../components/LoginState';
import Progress from '../pages/progress';

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
          <Route exact path="/measure/create" render={(props) => (<addMeasure history={props.history} />)} />
          <Route exact path="/measures/:id" component={MeasureSubjects} />
          <Route exact path="/measure/:id/edit" component={EditMeasure} />
          <Route exact path="/measures" component={MeasureList} />
          <Route exact path="/progress" component={Progress} />
          <Route exact path="/more" component={More} />
          <Route exact path="/admin" component={AdminHome} />
          <Route exact path="/admin/item/create" component={AdminAddSubject} />
          <Route exact path="/admin/item/:id" component={AdminEditSubject} />
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
