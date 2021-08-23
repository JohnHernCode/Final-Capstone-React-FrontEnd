import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Footer from '../components/footer';
import home from '../pages/home';
import notFound from '../pages/404';
import loginPage from '../pages/loginPage';
import signupPage from '../pages/signupPage';
import addMeasure from '../pages/addMeasure';
import editMeasure from '../pages/editMeasure';
import measureList from '../pages/measureList';
import measureSubjects from '../pages/measureSubjects';
import progress from '../pages/progress';
import more from '../pages/more';
import adminHome from '../pages/adminHome';
import adminAddSubject from '../pages/adminAddSubject';
import adminEditSubject from '../pages/adminEditSubject';
import loginState from '../components/loginState';

const AppRoutes = () => (
  <BrowserRouter>
    <div className="whole-container">
      <loginState />
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/login" render={(props) => (<loginPage history={props.history} />)} />
          <Route exact path="/signup" render={(props) => (<signupPage history={props.history} />)} />
          <Route exact path="/measure/create" render={(props) => (<addMeasure history={props.history} />)} />
          <Route exact path="/measures/:id" component={measureSubjects} />
          <Route exact path="/measure/:id/edit" component={editMeasure} />
          <Route exact path="/measures" component={measureList} />
          <Route exact path="/progress" component={progress} />
          <Route exact path="/more" component={more} />
          <Route exact path="/admin" component={adminHome} />
          <Route exact path="/admin/item/create" component={adminAddSubject} />
          <Route exact path="/admin/item/:id" component={adminEditSubject} />
          <Route component={notFound()} />
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
