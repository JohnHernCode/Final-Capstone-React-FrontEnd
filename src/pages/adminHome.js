import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import subjectList from '../components/adminSubjectList';
import addSubjects from '../actions/subjects';
import { getSubjects } from '../helpers/restSubjects';

const adminHome = ({
                     addSubjects, subjects, adminStatus, loginUser,
                   }) => {
  const [error, setError] = useState('');

  const runGetSubjects = async () => {
    try {
      const response = await getSubjects();
      if (response.length > 0) {
        setError('');
        addSubjects(response);
      } else {
        setError('No Subjects');
      }
    } catch {
      setError('Unable to fetch the data');
    }
  };

  useEffect(() => {
    if (adminStatus) {
      runGetSubjects();
    }
  }, []);

  return adminStatus && loginUser ? (
      <div className="admin">
        <h1 className="heading">
          Subjects
          <span className="admin-icon">Admin</span>
        </h1>
        <div className="content">
          {error && <p className="error-msg">{error}</p>}
          <div className="admin__subjects mb3">
            {subjects.length > 0 && <subjectList subjects={subjects} />}
          </div>
          <Link to="/admin/subject/create" className="btn dark">Add Subject</Link>
        </div>
      </div>
  ) : <Redirect to="/" />;
};

const mapStateToProps = (state) => ({
  subjects: state.subjects,
  adminStatus: state.user.user.admin,
  loginUser: state.user.logIn,
});

const mapDispatchToProps = (dispatch) => ({
  addSubjects: (subjects) => dispatch(addSubjects(subjects)),
});

adminHome.propTypes = {
  addSubjects: PropTypes.func.isRequired,
  subjects: PropTypes.instanceOf(Object),
  adminStatus: PropTypes.bool,
  loginUser: PropTypes.bool.isRequired,
};

adminHome.defaultProps = {
  subjects: [],
  adminStatus: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(adminHome);
