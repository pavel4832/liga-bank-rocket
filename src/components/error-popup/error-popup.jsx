import React from 'react';
import PropTypes from 'prop-types';
import {ERROR_TYPE, ERROR_MESSAGE} from '../../const';

const ErrorPopup = (props) => {
  const {type} = props;
  const errorMessage = (type === ERROR_TYPE.LOAN) ? ERROR_MESSAGE.LOAN : ERROR_MESSAGE.PRICE;

  return (
    <div className="step2__error popup-error" onClick={(evt) => evt.stopPropagation()}>
      <p className="popup-error__message">
        {errorMessage}
      </p>
      <p className="popup-error__text">
        Попробуйте использовать другие параметры для расчёта.
      </p>
    </div>
  );
};

ErrorPopup.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ErrorPopup;
