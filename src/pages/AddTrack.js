import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TrackForm from '../components/TrackForm';
import { addNewTrack } from '../helpers/restTracks';
import { getItems } from '../helpers/restItems';
import addItems from '../actions/items';
import getItemTitles from '../helpers/getItemTitles';

const AddTrack = ({
  loginUser, tracks, history, items, addItems,
}) => {
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const runGetItems = async () => {
    try {
      setError('');
      const response = await getItems();
      if (response.length > 0) {
        addItems(response);
      } else {
        setError('No Items');
      }
    } catch {
      setError('Unable to fetch the item data');
    }
  };
  useEffect(() => {
    runGetItems();
  }, []);

  const runAddNewTrack = async (result, itemId, date) => {
    try {
      setError('');
      await addNewTrack(result, itemId, date);
    } catch {
      setError('Unable to create new record');
    }
  };

  const handleSubmit = (StrDate, state) => {
    const sameDateTrack = tracks.find((track) => track.date === StrDate);
    if (sameDateTrack) {
      setError('You have already recorded time today');
    } else {
      setError('');
      setMsg('Adding time now...');
      Object.keys(state).forEach((key) => {
        if (state[key]) {
          runAddNewTrack(state[key], key, StrDate);
        }
      });
      setTimeout(() => {
        history.push('/tracks');
      }, 800);
    }
  };

  const itemTitles = getItemTitles(items, undefined);

  return (loginUser ? (
    <div className="add-track">
      <div className="content">
        <div className="content__msg">Add your study time for today!</div>
        <TrackForm handleSubmit={handleSubmit} itemTitles={itemTitles} targetDate={null} />
        {msg && <p className="info-msg">{msg}</p>}
        {error && <p className="error-msg">{error}</p>}
        <Link to="/tracks" className="home__btn">Cancel & Back to Time List</Link>
      </div>
    </div>
  ) : <Redirect to="/" />);
};

const mapStateToProps = (state) => ({
  items: state.items,
  tracks: state.tracks,
  loginUser: state.user.logIn,
});

const mapDispatchToProps = (dispatch) => ({
  addItems: (items) => dispatch(addItems(items)),
});

AddTrack.propTypes = {
  items: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  tracks: PropTypes.instanceOf(Array),
  history: PropTypes.instanceOf(Object),
  addItems: PropTypes.func,
};

AddTrack.defaultProps = {
  items: [],
  tracks: [],
  history: null,
  addItems: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);
