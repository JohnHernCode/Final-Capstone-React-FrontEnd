import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Chart from 'react-google-charts';
import { GiAchievement } from 'react-icons/gi';
import { BiChevronRightCircle } from 'react-icons/bi';
import { moment } from '../api/api';
import calcAchieveTotalRate from '../helpers/calcAchieveTotalRate';

const TrackListItem = ({ milSec, sameDateMeasurements, subjectNum }) => {
  const [dateSign, setDateSign] = useState('');

  const checkDateSign = () => {
    const targetDay = moment(milSec);

    if (targetDay.isSame(moment(), 'day')) {
      setDateSign('today');
    } else if (targetDay.isSame(moment().subtract(1, 'days'), 'day')) {
      setDateSign('yesterday');
    } else if (targetDay.isSameOrBefore(moment().subtract(7, 'days'))) {
      setDateSign('lastweek');
    }
  };

  const setBeforeSign = () => {
    const beforeArray = Array.from(document.querySelectorAll('.lastweek'));
    if (beforeArray[0] === undefined || !beforeArray[0].classList) return;
    beforeArray[0].classList.add('first');
    beforeArray[0].firstElementChild.textContent = 'before last week';
  };

  useEffect(() => {
    checkDateSign();
    setTimeout(() => {
      setBeforeSign();
    }, 1000);
  }, []);

  const totalRate = calcAchieveTotalRate(sameDateMeasurements, subjectNum) || 0;
  const rateForChart = totalRate >= 100 ? 100 : totalRate;
  const leftRateForChart = 100 - rateForChart;

  return (
      <div className={`measure__subject ${dateSign}`}>
        <div className="measure__subject__sign">{dateSign !== 'lastweek' ? dateSign : ''}</div>
        <Link to={`/measures/${milSec}`} className="measure__subject__link">
          <div className="measure__subject__graph">
            <Chart
                width="60px"
                height="60px"
                chartType="PieChart"
                loader={<div className="loader">Loading...</div>}
                data={[['Pac Man', 'Percentage'], ['', rateForChart], ['', leftRateForChart]]}
                options={{
                  legend: 'none',
                  pieSliceText: 'none',
                  pieStartAngle: 0,
                  tooltip: { trigger: 'none' },
                  slices: {
                    0: { color: '#41b5e8' },
                    1: { color: '#eaeef1' },
                  },
                }}
                rootProps={{ 'data-testid': '6' }}
            />
          </div>
          <div className="measure__item__date">{moment(milSec).format('MMM Do YYYY')}</div>
          <div className="measure__subject__rate">
            {rateForChart >= 100 && (
                <span className="goodjob">
              <GiAchievement />
            </span>
            )}
            <span className="rate">{rateForChart}</span>
            %
          </div>
          <div className="measure__subject__toright">
            <BiChevronRightCircle />
          </div>
        </Link>
      </div>
  );
};

TrackListItem.propTypes = {
  milSec: PropTypes.number,
  sameDateMeasurements: PropTypes.instanceOf(Array),
  subjectNum: PropTypes.number,
};

TrackListItem.defaultProps = {
  milSec: 0,
  sameDateMeasurements: [],
  subjectNum: 0,
};

export default TrackListItem;
