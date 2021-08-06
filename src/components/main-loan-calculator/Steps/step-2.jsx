import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {PriceData, FirstPaymentRate, LoanTerm, LoanPurpose, PriceStep, RADIX, Units} from '../../../const';
import {changePrice, changeFirstPayment, changeLoanTerm, changeMotherMoney, changeInsuranceAuto, changeInsuranceLive} from '../../../store/actions';
import {getNumberFromString, getLoanTermDescription, getLoanTermNumber, getCaret, setCaretToPos} from '../../../utils';

const Step2 = (props) => {
  const {purpose, price, firstPayment, loanTerm, isMother, isInsuranceAuto, isInsuranceLive} = useSelector((state) => state.DATA);
  const {isPriceError, setPriceError} = props;
  const [isPrice, setPrice] = useState(`${price.toLocaleString(`ru-RU`)} рублей`);
  const [isFirstPayment, setPayment] = useState(`${(price * firstPayment / FirstPaymentRate.MAX).toLocaleString(`ru-RU`)} рублей`);
  const [isLoanTerm, setLoanTerm] = useState(`${loanTerm.toLocaleString(`ru-RU`)}${getLoanTermDescription(loanTerm)}`);
  const [isCaretPos, setCaretPos] = useState();
  const [isActiveElement, setActiveElement] = useState(document.querySelector(`:focus`));

  const dispatch = useDispatch();

  useEffect(() => {
    setPrice(`${price.toLocaleString(`ru-RU`)} рублей`);
    setPayment(`${(price * firstPayment / FirstPaymentRate.MAX).toLocaleString(`ru-RU`)} рублей`);
    setLoanTerm(`${loanTerm.toLocaleString(`ru-RU`)}${getLoanTermDescription(loanTerm)}`);
  }, [purpose]);

  useEffect(() => {
    setCaretToPos(isActiveElement, isCaretPos);
  }, [isPrice, isFirstPayment, isLoanTerm]);

  const minPrice = (purpose === LoanPurpose.MORTGAGE) ? PriceData.START_MORTGAGE : PriceData.START_AUTO;
  const maxPrice = (purpose === LoanPurpose.MORTGAGE) ? PriceData.END_MORTGAGE : PriceData.END_AUTO;
  const priceStep = (purpose === LoanPurpose.MORTGAGE) ? PriceStep.MORTGAGE : PriceStep.AUTO;
  const firstPaymentMin = (purpose === LoanPurpose.MORTGAGE) ? FirstPaymentRate.MORTGAGE : FirstPaymentRate.AUTO;
  const minLoanTerm = (purpose === LoanPurpose.MORTGAGE) ? LoanTerm.MIN_MORTGAGE : LoanTerm.MIN_AUTO;
  const maxLoanTerm = (purpose === LoanPurpose.MORTGAGE) ? LoanTerm.MAX_MORTGAGE : LoanTerm.MAX_AUTO;

  const setNewPrice = (newPrice) => {
    dispatch(changePrice(newPrice));
    setPrice(`${newPrice.toLocaleString(`ru-RU`)} рублей`);
    setPayment(`${(newPrice * firstPayment / FirstPaymentRate.MAX).toLocaleString(`ru-RU`)} рублей`);
  };

  const checkNewPrice = (newPrice) => {
    if (newPrice < minPrice) {
      if (!isPriceError) {
        setPriceError(true);
        return minPrice;
      } else {
        setPriceError(false);
        return minPrice;
      }
    } else {
      if (newPrice > maxPrice) {
        if (!isPriceError) {
          setPriceError(true);
          return maxPrice;
        } else {
          setPriceError(false);
          return maxPrice;
        }
      } else {
        setPriceError(false);
        return newPrice
      }
    }
  };

  const inputClickHandler = (evt, gap) => {
    if (isPriceError) {
      let priceValue = document.getElementById(`price`).value;
      priceValue = checkNewPrice(priceValue );
      if (priceValue) {
        setNewPrice(priceValue);
      }
      setPriceError(false);
    }
    const currentInput = evt.target;
    const rangeValue = evt.target.value.length;
    let currentCaretPos = getCaret(currentInput);
    if (currentCaretPos > rangeValue - gap) {
      setCaretToPos(currentInput, rangeValue - gap);
    }
    currentCaretPos = getCaret(currentInput);
    setCaretPos(currentCaretPos);
  };

  const priceChangeHandler = (evt) => {
    let newPrice;
    if (evt.target.value.search(`рублей`) > 0) {
      newPrice = getNumberFromString(evt.target.value, `рублей`);
    } else {
      newPrice = parseInt(evt.target.value, RADIX);
    }
    (newPrice) && setNewPrice(newPrice);
  };

  const priceCheckHandler = (evt) => {
    let newPrice;
    if (evt.target.value.search(`рублей`) > 0) {
      newPrice = getNumberFromString(evt.target.value, `рублей`);
    } else {
      newPrice = parseInt(evt.target.value, RADIX);
    }
    if (newPrice < minPrice || newPrice > maxPrice) {
      setPriceError(true);
    } else {
      (newPrice) && setNewPrice(newPrice);
    }
  };

  const priceDownClickHandler = () => {
    let newPrice = checkNewPrice(price - priceStep);
    setNewPrice(newPrice);
  };

  const priceUpClickHandler = () => {
    let newPrice = checkNewPrice(price + priceStep);
    setNewPrice(newPrice);
  };

  const loanFirstPaymentHandler = (evt) => {
    let newPayment;
    if (evt.target.value.search(`рублей`) > 0) {
      newPayment = getNumberFromString(evt.target.value, `рублей`);
    } else {
      newPayment = parseInt(evt.target.value, RADIX);
    }
    if (newPayment) {
      setPayment(`${newPayment.toString()}`);
      dispatch(changeFirstPayment(newPayment * FirstPaymentRate.MAX / price));
    }
  };

  const loanFirstPaymentCheckHandler = (evt) => {
    let newPayment;
    if (evt.target.value.search(`рублей`) > 0) {
      newPayment = getNumberFromString(evt.target.value, `рублей`);
    } else {
      newPayment = parseInt(evt.target.value, RADIX);
    }
    let paymentRate = newPayment * FirstPaymentRate.MAX / price;
    if (paymentRate < firstPaymentMin) {
      paymentRate = firstPaymentMin;
    } else if (paymentRate > FirstPaymentRate.MAX) {
      paymentRate = FirstPaymentRate.MAX;
    }
    setPayment(`${(price * paymentRate / FirstPaymentRate.MAX).toLocaleString(`ru-RU`)} рублей`);
    dispatch(changeFirstPayment(paymentRate));
  };

  const loanFirstPaymentRangeHandler = (evt) => {
    const paymentRate = evt.target.value;
    setPayment(`${(price * paymentRate / FirstPaymentRate.MAX).toLocaleString(`ru-RU`)} рублей`);
    dispatch(changeFirstPayment(paymentRate));
  };

  const loanTermChangeHandler = (evt) => {
    let newTerm;
    if (evt.target.value.search(`лет`) > 0) {
      newTerm = getNumberFromString(evt.target.value, `лет`);
    } else {
      newTerm = parseInt(evt.target.value, RADIX);
    }
    if (newTerm) {
      setLoanTerm(`${newTerm.toString()}${getLoanTermDescription(newTerm)}`);
      dispatch(changeLoanTerm(newTerm));
    }
  };

  const loanTermCheckHandler = (evt) => {
    let newTerm = getLoanTermNumber(evt.target.value);
    if (!newTerm || newTerm < minLoanTerm) {
      newTerm = minLoanTerm;
    } else if (newTerm > maxLoanTerm) {
      newTerm = maxLoanTerm;
    }
    setLoanTerm(`${newTerm.toLocaleString(`ru-RU`)}${getLoanTermDescription(newTerm)}`);
    dispatch(changeLoanTerm(newTerm));
  };

  const loanTermRangeChangeHandler = (evt) => {
    const newTerm = parseInt(evt.target.value, RADIX);
    setLoanTerm(`${newTerm.toLocaleString(`ru-RU`)}${getLoanTermDescription(newTerm)}`);
    dispatch(changeLoanTerm(newTerm));
  };

  const onlyNumberInput = (evt) => {
    if (!(evt.key === `ArrowLeft` || evt.key === `ArrowRight` || evt.key === `Backspace` || evt.key === `Tab` || evt.key === `Delete` || (/[0-9\+\ \-\(\)]/.test(evt.key)))) {
      evt.preventDefault();
    }
    if (evt.key === `Backspace` ) {
      setCaretPos(getCaret(evt.target) - 1);
    }
    if ((/[0-9\+\ \-\(\)]/.test(evt.key))) {
      setCaretPos(getCaret(evt.target) + 1);
    }
  };

  return (
    <div className="loan-calculator__step2 step step2">
      <h3 className="step__title">Шаг 2. Введите параметры кредита</h3>
      <div className="step__label-wrapper">
        <label className="step__label">
          {(purpose === LoanPurpose.MORTGAGE) ? `Стоимость недвижимости` : `Стоимость автомобиля`}
          <input
            value={(!isPriceError) ? isPrice : `Некорректное значение`}
            className={`step__field step2__field ${(isPriceError) && `field-error`}`}
            type="text"
            id="price"
            name="price"
            onClick={(evt) => inputClickHandler(evt, Units.PRICE)}
            onChange={priceChangeHandler}
            onBlur={priceCheckHandler}
            onKeyDown={onlyNumberInput}
            onFocus={(evt) => setActiveElement(evt.target)}
          />
        </label>
        <span className="step__comments">От {minPrice.toLocaleString(`ru-RU`)}  до {maxPrice.toLocaleString(`ru-RU`)} рублей</span>
        <button
          className="step__button button button--decrease"
          aria-label="Увеличить"
          onClick={priceDownClickHandler}
        >
          <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="16" y2="1" stroke="#1F1E25" strokeWidth="2"/>
          </svg>
        </button>
        <button
          className="step__button button button--increase"
          aria-label="Уменьшить"
          onClick={priceUpClickHandler}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8H16M8 0V16" stroke="#1F1E25" strokeWidth="2"/>
          </svg>
        </button>
      </div>
      <div className="step__label-wrapper">
        <label className="step__label">
          Первоначальный взнос
          <input
            value={isFirstPayment}
            className="step__field step2__field"
            type="text"
            name="firstPayment"
            onClick={(evt) => inputClickHandler(evt, Units.PRICE)}
            onChange={loanFirstPaymentHandler}
            onBlur={loanFirstPaymentCheckHandler}
            onKeyDown={onlyNumberInput}
            onFocus={(evt) => setActiveElement(evt.target)}
          />
        </label>
        <input
          id="payment-range"
          className="step__range"
          type="range"
          min={`${firstPaymentMin}`}
          max="100"
          step="5"
          value={`${firstPayment}`}
          onInput={loanFirstPaymentRangeHandler}
        />
        <label htmlFor="payment-range" className="visually-hidden">
          Изменить значение первого платежа
        </label>
        <span className="step__comments">{firstPayment.toLocaleString(`ru-RU`)}%</span>
      </div>
      <div className="step__label-wrapper">
        <label className="step__label">
          Срок кредитования
          <input
            value={isLoanTerm}
            className="step__field step2__field"
            type="text"
            name="loanTerm"
            onClick={(evt) => inputClickHandler(evt, Units.YEAR)}
            onChange={loanTermChangeHandler}
            onBlur={loanTermCheckHandler}
            onKeyDown={onlyNumberInput}
            onFocus={(evt) => setActiveElement(evt.target)}
          />
        </label>
        <input
          className="step__range"
          id="term-range"
          type="range"
          min={`${minLoanTerm}`}
          max={`${maxLoanTerm}`}
          step="1"
          value={`${loanTerm}`}
          onChange={loanTermRangeChangeHandler}
        />
        <label htmlFor="term-range" className="visually-hidden">
          Изменить значение срока кредитования
        </label>
        <div className="step__comments-list">
          <span className="step__comments">
            {minLoanTerm.toLocaleString(`ru-RU`)}
            {getLoanTermDescription(minLoanTerm)}
          </span>
          <span className="step__comments">{maxLoanTerm.toLocaleString(`ru-RU`)} лет</span>
        </div>
      </div>
      {(purpose === LoanPurpose.MORTGAGE) && (
        <div className="step__checkbox-wrapper">
          <input
            id="step-checkbox-mother"
            className="step__checkbox visually-hidden"
            type="checkbox"
            name="mother"
            onChange={() => dispatch(changeMotherMoney(!isMother))}
          />
          <label htmlFor="step-checkbox-mother" className="step__label step__label--checkbox">
            Использовать материнский капитал
          </label>
        </div>
      )}
      {(purpose === LoanPurpose.AUTO) && (
        <div className="step__checkbox-wrapper">
          <input
            id="step-checkbox-auto"
            className="step__checkbox visually-hidden"
            type="checkbox"
            name="mother"
            onChange={() => dispatch(changeInsuranceAuto(!isInsuranceAuto))}
          />
          <label htmlFor="step-checkbox-auto" className="step__label step__label--checkbox">
            Оформить КАСКО в нашем банке
          </label>
          <input
            id="step-checkbox-live"
            className="step__checkbox visually-hidden"
            type="checkbox"
            name="mother"
            onChange={() => dispatch(changeInsuranceLive(!isInsuranceLive))}
          />
          <label htmlFor="step-checkbox-live" className="step__label step__label--checkbox">
            Оформить Страхование жизни в нашем банке
          </label>
        </div>
      )}
    </div>
  );
};

Step2.propTypes = {
  isPriceError: PropTypes.bool.isRequired,
  setPriceError: PropTypes.func.isRequired,
};

export default Step2;
