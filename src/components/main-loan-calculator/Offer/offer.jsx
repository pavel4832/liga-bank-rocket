import React from 'react';
import PropTypes from 'prop-types';

const Offer = (props) => {
  const {setActive} = props;

  return (
    <div className="loan-calculator__offer offer">
      <h3 className="offer__title">Наше предложение</h3>
      <div className="offer__wrapper">
        <div className="offer__item loan-amount">
          <p className="offer__data">1 330 000 рублей</p>
          <p className="offer__comment">Сумма ипотеки</p>
        </div>
        <div className="offer__item loan-rate">
          <p className="offer__data">9,40%</p>
          <p className="offer__comment">Процентная ставка</p>
        </div>
        <div className="offer__item loan-payment">
          <p className="offer__data">27 868 рублей</p>
          <p className="offer__comment">Ежемесячный платеж</p>
        </div>
        <div className="offer__item loan-salary">
          <p className="offer__data">61 929 рублей</p>
          <p className="offer__comment">Необходимый доход</p>
        </div>
      </div>
      <button
        className="offer__button button"
        onClick={() => setActive(true)}
      >Оформить заявку</button>
    </div>
  );
};

Offer.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default Offer;
