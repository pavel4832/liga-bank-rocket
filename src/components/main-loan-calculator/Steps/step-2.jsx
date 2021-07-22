import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ErrorPopup from '../../error-popup/error-popup';
import {
  PRICES_DATA,
  FIRST_PAYMENT_RATE,
  LOAN_TERM,
  LoanPurpose,
  ERROR_TYPE,
  PRICE_STEP,
  Validations, RADIX
} from '../../../const';
import {changePrice, changeFirstPayment, changeLoanTerm} from '../../../store/actions';
import Popup from "../../popup/popup";
import {getNumberFromString, popupOpenHandler} from '../../../utils';
import {useInput} from '../../../hooks/hooks';

const Step2 = () => {
  const {purpose, price, firstPayment, loanTerm} = useSelector((state) => state.DATA);
  const [isPriceError, setPriceError] = useState(false);
  const [isPrice, setPrice] = useState(`${price.toLocaleString(`ru-RU`)} рублей`);
  const dispatch = useDispatch();

  const maxLoanTerm = (purpose === LoanPurpose.MORTGAGE) ? LOAN_TERM.MAX_MORTGAGE : LOAN_TERM.MAX_AUTO;

  const priceChangeHandler = (evt) => {
    let newPrice;
    if (evt.target.value.search(`рублей`) > 0) {
      newPrice = getNumberFromString(evt.target.value, `рублей`);
    } else {
      newPrice = evt.target.value;
    }
    setPrice(`${newPrice.toLocaleString(`ru-RU`)}`);
    dispatch(changePrice(newPrice));
  };

  const priceCheckHandler = (evt) => {
    let newPrice;
    if (evt.target.value.search(`рублей`) > 0) {
      newPrice = getNumberFromString(evt.target.value, `рублей`);
    } else {
      newPrice = parseInt(evt.target.value, RADIX);
    }
    if (newPrice < PRICES_DATA.START || newPrice > PRICES_DATA.END) {
      setPriceError(true);
    } else {
      setPrice(`${newPrice.toLocaleString(`ru-RU`)} рублей`);
    }
  };

  const priceDownClickHandler = () => {
    const newPrice = price - PRICE_STEP;
    if (newPrice < PRICES_DATA.START) {
      setPriceError(true);
    } else {
      setPriceError(false);
      dispatch(changePrice(newPrice));
      setPrice(`${newPrice.toLocaleString(`ru-RU`)} рублей`);
    }
  };

  const priceUpClickHandler = () => {
    const newPrice = price + PRICE_STEP;
    if (newPrice > PRICES_DATA.END) {
      setPriceError(true);
    } else {
      setPriceError(false);
      dispatch(changePrice(newPrice));
      setPrice(`${newPrice.toLocaleString(`ru-RU`)} рублей`);
    }
  };

  const loanFirstPaymentHandler = (evt) => {
    const newFirstPayment = evt.target.value;
    dispatch(changeFirstPayment(newFirstPayment));
  };

  const loanTermChangeHandler = (evt) => {
    const newLoanTerm = evt.target.value;
    dispatch(changeLoanTerm(newLoanTerm));
  };

  return (
    <div className="loan-calculator__step2 step step2">
      <h3 className="step__title">Шаг 2. Введите параметры кредита</h3>
      <label className="step__label">
        Стоимость недвижимости
        <button
          className="step__button button button--decrease"
          aria-label="Увеличить"
          onClick={priceDownClickHandler}
        >
          <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="16" y2="1" stroke="#1F1E25" strokeWidth="2"/>
          </svg>
        </button>
        <input
          value={(!isPriceError) ? isPrice : `Некорректное значение`}
          className={`step__field step2__field ${(isPriceError) && `field-error`}`}
          type="text"
          name="price"
          onClick={() => setPriceError(false)}
          onChange={priceChangeHandler}
          onBlur={priceCheckHandler}
        />
        <button
          className="step__button button button--increase"
          aria-label="Уменьшить"
          onClick={priceUpClickHandler}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8H16M8 0V16" stroke="#1F1E25" strokeWidth="2"/>
          </svg>
        </button>
        <span className="step__comments">От {PRICES_DATA.START.toLocaleString(`ru-RU`)}  до {PRICES_DATA.END.toLocaleString(`ru-RU`)} рублей</span>
      </label>
      <label className="step__label">
        Первоначальный взнос
        <input
          value={`${(price * firstPayment / FIRST_PAYMENT_RATE.MAX).toLocaleString(`ru-RU`)} рублей`}
          className="step__field step2__field"
          type="text"
          name="firstPayment"
          onChange={loanFirstPaymentHandler}
        />
        <input
          className="step__range"
          type="range"
          min={`${FIRST_PAYMENT_RATE.MIN}`}
          max="100"
          step="1"
          value={`${firstPayment}`}
          onChange={loanFirstPaymentHandler}
        />
        <span className="step__comments">{FIRST_PAYMENT_RATE.MIN.toLocaleString(`ru-RU`)}%</span>
      </label>
      <label className="step__label">
        Срок кредитования
        <input
          value={`${loanTerm.toLocaleString(`ru-RU`)} лет`}
          className="step__field step2__field"
          type="text"
          name="loanTerm"
          onChange={loanTermChangeHandler}
        />
        <input
          className="step__range"
          type="range"
          min={`${LOAN_TERM.MIN}`}
          max={`${maxLoanTerm}`}
          step="5"
          value={`${loanTerm}`}
          onChange={loanTermChangeHandler}
        />
        <div className="step__comments-list">
          <span className="step__comments">{LOAN_TERM.MIN.toLocaleString(`ru-RU`)} лет</span>
          <span className="step__comments">{maxLoanTerm.toLocaleString(`ru-RU`)} лет</span>
        </div>
      </label>
      <input
        id="step-checkbox"
        className="step__checkbox visually-hidden"
        type="checkbox"
        name="mother"
      />
      <label htmlFor="step-checkbox" className="step__label step__label--checkbox">
        Использовать материнский капитал
      </label>
    </div>
  );
};

export default Step2;
