import { useState } from 'react';
import { moment } from '../api/api';

const [, setDateSign] = useState('');

export const checkDateSign = () => {
  const milSec = 0;
  const targetDay = moment(milSec);

  if (targetDay.isSame(moment(), 'day')) {
    setDateSign('today');
  } else if (targetDay.isSame(moment().subtract(1, 'days'), 'day')) {
    setDateSign('yesterday');
  } else if (targetDay.isSameOrBefore(moment().subtract(7, 'days'))) {
    setDateSign('lastweek');
  }
};

export const setBeforeSign = () => {
  const beforeArray = Array.from(document.querySelectorAll('.lastweek'));
  if (beforeArray[0] === undefined || !beforeArray[0].classList) return;
  beforeArray[0].classList.add('first');
  beforeArray[0].firstElementChild.textContent = 'before last week';
};
