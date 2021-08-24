import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminSubjectForm from '../components/adminSubjectForm';
import { addNewSubject } from '../helpers/restSubjects';

const AdminAddSubject = ({ history, adminStatus, loginUser }) => {
  const [error, setError] = useState('');

  const runAddNewSubject = async (title, unit, icon, target) => {
    try {
      setError('');
      await addNewSubject(title, unit, icon, target);
      history.push('/admin');
    } catch {
      setError('Unable to fetch the data');
    }
  };

  const handleSubmit = ({
    title, unit, icon, target,
  }) => {
    runAddNewSubject(title, unit, icon, target);
  };

  return adminStatus && loginUser ? (
    <div className="admin">
      <h1 className="heading">
        Admin Add Subject
        <span className="admin-icon">Admin</span>
      </h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <AdminSubjectForm handleSubmit={handleSubmit} />
        <Link to="/admin" className="btn">Back to Subject List</Link>
      </div>
    </div>
  ) : <Redirect to="/" />;
};

const mapStateToProps = (state, props) => ({
  subjects: state.subjects,
  subject: state.subjects.find((subject) => subject.id === Number(props.match.params.id)),
  adminStatus: state.user.user.admin,
  loginUser: state.user.logIn,
});

AdminAddSubject.propTypes = {
  history: PropTypes.instanceOf(Object),
  adminStatus: PropTypes.bool,
  loginUser: PropTypes.bool.isRequired,
};

AdminAddSubject.defaultProps = {
  history: null,
  adminStatus: false,
};

export default connect(mapStateToProps)(AdminAddSubject);
