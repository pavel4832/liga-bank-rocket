import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {KeyName} from '../../const';
import {popupCloseHandler} from '../../utils';

const Popup = (props) => {
  const {active, setActive, children} = props;

  const onKeydown = (evt) => {
    switch (evt.key) {
      case KeyName.ESC:
        setActive(false);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener(`keydown`, onKeydown);
    return () => document.removeEventListener(`keydown`, onKeydown);
  });

  return (
    <section
      className={`login-popup popup ${active ? `active` : ``}`}
      onClick={() => popupCloseHandler(setActive)}
    >
      {children}
    </section>
  );
};

Popup.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Popup;
