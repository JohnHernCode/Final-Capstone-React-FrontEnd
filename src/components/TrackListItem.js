import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Chart from 'react-google-charts';
import { GiAchievement } from 'react-icons/gi';
import { BiChevronRightCircle } from 'react-icons/bi';
import { moment } from '../api/api';
import calcAchieveTotalRate from '../helpers/calcAchieveTotalRate';
import { checkDateSign, setBeforeSign } from '../helpers/trackListHelper';

const TrackListItem = ({ milSec, sameDateTracks, itemNum }) => {
  const [dateSign, setDateSign] = useState('');

  useEffect(() => {
    checkDateSign(setDateSign, setBeforeSign);
  }, []);

  const totalRate = calcAchieveTotalRate(sameDateTracks, itemNum) || 0;
  const rateForChart = totalRate >= 100 ? 100 : totalRate;
  const leftRateForChart = 100 - rateForChart;

  return (
    <div className={`tracks__item ${dateSign}`}>
      <div className="tracks__item__sign">{dateSign !== 'lastweek' ? dateSign : ''}</div>
      <Link to={`/tracks/${milSec}`} className="tracks__item__link">
        <div className="tracks__item__graph">
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
                0: { color: '#ffffff' },
                1: { color: '#af0101' },
              },
            }}
            rootProps={{ 'data-testid': '6' }}
          />
        </div>
        <div className="tracks__item__date">{moment(milSec).format('MMM Do YYYY')}</div>
        <div className="tracks__item__rate">
          {rateForChart >= 100 && (
            <span className="goodjob">
              <GiAchievement />
            </span>
          )}
          <span className="rate">{rateForChart}</span>
          %
        </div>
        <div className="tracks__item__toright">
          <BiChevronRightCircle />
        </div>
      </Link>
    </div>
  );
};

TrackListItem.propTypes = {
  milSec: PropTypes.number,
  sameDateTracks: PropTypes.instanceOf(Array),
  itemNum: PropTypes.number,
};

TrackListItem.defaultProps = {
  milSec: 0,
  sameDateTracks: [],
  itemNum: 0,
};

export default TrackListItem;
