import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

const AdminSubjectList = ({ subjects }) => (
  <div className="admin__list">
    {subjects.map((subject) => {
      const {
        id, title, unit, target,
      } = subject;
      return (
        <div key={id} className="admin__list__subject">
          <Link to={`/admin/subject/${id}`} className="admin__list__subject__wrap">
            <h2 className="title">{title}</h2>
            <p className="target">
              <span className="target-num">{target}</span>
              <span className="unit">{pluralize(unit, target)}</span>
            </p>
          </Link>
        </div>
      );
    })}
  </div>
);

AdminSubjectList.propTypes = {
  subjects: PropTypes.instanceOf(Array),
};

AdminSubjectList.defaultProps = {
  subjects: [],
};

export default AdminSubjectList;
