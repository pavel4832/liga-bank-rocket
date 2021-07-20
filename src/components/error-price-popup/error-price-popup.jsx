import React from 'react';
import PropTypes from "prop-types";
import {popupCloseHandler} from "../../utils";

const ErrorPricePopup = (props) => {
  const {setActive} = props;

  return (
    <div className="step2-price-error popup__container" onClick={(evt) => evt.stopPropagation()}>
      <div className="popup__header">
        <button
          className="popup__btn button"
          type="button"
          aria-label="Закрыть"
          onClick={() => popupCloseHandler(setActive)}
        ></button>
        <p className="step2-price-error__text">Ошибка</p>
      </div>
    </div>
  );
};

ErrorPricePopup.propTypes = {
  setActive: PropTypes.func.isRequired,
};
export default ErrorPricePopup;
