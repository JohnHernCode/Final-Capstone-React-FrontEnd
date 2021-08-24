import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminSubjectForm from '../components/adminSubjectForm';
import { updateSubject, removeSubjectFromDB } from '../helpers/restSubjects';

const AdminEditSubject = ({
  subject, history, adminStatus, loginUser,
}) => {
  const [error, setError] = useState('');

  const {
    id, title, unit, icon, target,
  } = subject;

  const runUpdateSubject = async (title, unit, icon, target) => {
    try {
      setError('');
      await updateSubject(id, title, unit, icon, target);
      history.push('/admin');
    } catch {
      setError('Sorry, unable to fetch the data');
    }
  };

  const runRemoveSubjectFromDB = async (id) => {
    try {
      setError('');
      await removeSubjectFromDB(id);
      history.push('/admin');
    } catch {
      setError('Sorry, unable to remove the subject');
    }
  };

  const handleSubmit = ({
    title, unit, icon, target,
  }) => {
    runUpdateSubject(title, unit, icon, target);
  };

  const onRemove = () => {
    runRemoveSubjectFromDB(id);
  };

  return adminStatus && loginUser ? (
    <div className="admin">
      <h1 className="heading">
        Edit Subject
        <span className="admin-icon">Admin</span>
      </h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <AdminSubjectForm
          id={id}
          title={title}
          unit={unit}
          icon={icon}
          target={target}
          handleSubmit={handleSubmit}
        />
        <button type="button" className="btn mb2" onClick={onRemove}>Remove Subject</button>
        <Link to="/admin" className="btn">Cancel & Back to Subject List</Link>
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

AdminEditSubject.propTypes = {
  subject: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  adminStatus: PropTypes.bool,
  loginUser: PropTypes.bool.isRequired,
};

AdminEditSubject.defaultProps = {
  subject: {},
  history: null,
  adminStatus: false,
};

export default connect(mapStateToProps)(AdminEditSubject);
