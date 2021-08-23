import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

const measureSubject = ({ subject, result, targetDate }) => {
  const {
    icon, unit, title, target,
  } = subject;
  const rate = result / target;
  const AchievementRate = Math.floor((rate >= 1 ? 1 : rate) * 100);

  return (
      <div className="subject__subject">
        <Link to={`/measure/${Number(targetDate)}/edit`} className="subject__subject-link">
          <div className="subject__icon">
            <span className="iconify" data-icon={icon || 'bi:pen-fill'} data-inline="false" />
          </div>
          <div className="subject__text">
            <div className="subject__title">{title}</div>
            <div className="subject__result">
              <span className="subject__result__num">{result || '0'}</span>
              <span className="subject__result__unit">{`${pluralize(unit, result)} / ${target}`}</span>
            </div>
            <div className="subject__rate">{`Achievement rate: ${AchievementRate || '0'} %`}</div>
          </div>
        </Link>
      </div>
  );
};

measureSubject.propTypes = {
  subject: PropTypes.instanceOf(Object),
  result: PropTypes.number,
  targetDate: PropTypes.number,
};

measureSubject.defaultProps = {
  subject: {},
  result: 0,
  targetDate: 0,
};

export default measureSubject;
