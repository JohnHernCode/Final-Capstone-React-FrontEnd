import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminItemForm from '../components/AdminItemForm';
import { updateItem, removeItemFromDB } from '../helpers/restItems';

const AdminEditItem = ({
  item, history, adminStatus, loginUser,
}) => {
  const [error, setError] = useState('');

  const {
    id, title, unit, icon, target,
  } = item;

  const runUpdateItem = async (title, unit, icon, target) => {
    try {
      setError('');
      await updateItem(id, title, unit, icon, target);
      history.push('/admin');
    } catch {
      setError('Sorry, unable to fetch the data');
    }
  };

  const runRemoveItemFromDB = async (id) => {
    try {
      setError('');
      await removeItemFromDB(id);
      history.push('/admin');
    } catch {
      setError('Sorry, unable to remove the item');
    }
  };

  const handleSubmit = ({
    title, unit, icon, target,
  }) => {
    runUpdateItem(title, unit, icon, target);
  };

  const onRemove = () => {
    runRemoveItemFromDB(id);
  };

  return adminStatus && loginUser ? (
    <div className="admin">
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <AdminItemForm
          id={id}
          title={title}
          unit={unit}
          icon={icon}
          target={target}
          handleSubmit={handleSubmit}
        />
        <button type="button" className="home__btn" onClick={onRemove}>Remove Subject</button>
        <Link to="/admin" className="home__btn">Cancel & Back to Subject List</Link>
      </div>
    </div>
  ) : <Redirect to="/" />;
};

const mapStateToProps = (state, props) => ({
  items: state.items,
  item: state.items.find((item) => item.id === Number(props.match.params.id)),
  adminStatus: state.user.user.admin,
  loginUser: state.user.logIn,
});

AdminEditItem.propTypes = {
  item: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  adminStatus: PropTypes.bool,
  loginUser: PropTypes.bool.isRequired,
};

AdminEditItem.defaultProps = {
  item: {},
  history: null,
  adminStatus: false,
};

export default connect(mapStateToProps)(AdminEditItem);
