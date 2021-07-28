import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PriceData, FirstPaymentRate, LoanTerm, LoanPurpose, PriceStep, RADIX} from '../../../const';
import {changePrice, changeFirstPayment, changeLoanTerm, changeMotherMoney, changeInsuranceAuto, changeInsuranceLive} from '../../../store/actions';
import {getNumberFromString} from '../../../utils';

const Step2 = () => {
  const {purpose, price, firstPayment, loanTerm, isMother, isInsuranceAuto, isInsuranceLive} = useSelector((state) => state.DATA);
  const [isPriceError, setPriceError] = useState(false);
  const [isPrice, setPrice] = useState(`${price.toLocaleString(`ru-RU`)} рублей`);
  const [isFirstPayment, setPayment] = useState(`${(price * firstPayment / FirstPaymentRate.MAX).toLocaleString(`ru-RU`)} рублей`);
  const [isLoanTerm, setLoanTerm] = useState(`${loanTerm.toLocaleString(`ru-RU`)} лет`);

  const dispatch = useDispatch();

  useEffect(() => {
    setPrice(`${price.toLocaleString(`ru-RU`)} рублей`);
    setPayment(`${(price * firstPayment / FirstPaymentRate.MAX).toLocaleString(`ru-RU`)} рублей`);
    setLoanTerm(`${loanTerm.toLocaleString(`ru-RU`)} лет`);
  }, [purpose]);

  const minPrice = (purpose === LoanPurpose.MORTGAGE) ? PriceData.START_MORTGAGE : PriceData.START_AUTO;
  const maxPrice = (purpose === LoanPurpose.MORTGAGE) ? PriceData.END_MORTGAGE : PriceData.END_AUTO;
  const priceStep = (purpose === LoanPurpose.MORTGAGE) ? PriceStep.MORTGAGE : PriceStep.AUTO;
  const firstPaymentMin = (purpose === LoanPurpose.MORTGAGE) ? FirstPaymentRate.MORTGAGE : FirstPaymentRate.AUTO;
  const minLoanTerm = (purpose === LoanPurpose.MORTGAGE) ? LoanTerm.MIN_MORTGAGE : LoanTerm.MIN_AUTO;
  const maxLoanTerm = (purpose === LoanPurpose.MORTGAGE) ? LoanTerm.MAX_MORTGAGE : LoanTerm.MAX_AUTO;

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
    if (newPrice < minPrice || newPrice > maxPrice) {
      setPriceError(true);
    } else {
      setPrice(`${newPrice.toLocaleString(`ru-RU`)} рублей`);
    }
  };

  const priceDownClickHandler = () => {
    const newPrice = price - priceStep;
    if (newPrice < minPrice) {
      setPriceError(true);
    } else {
      setPriceError(false);
      dispatch(changePrice(newPrice));
      setPrice(`${newPrice.toLocaleString(`ru-RU`)} рублей`);
    }
  };

  const priceUpClickHandler = () => {
    const newPrice = price + priceStep;
    if (newPrice > maxPrice) {
      setPriceError(true);
    } else {
      setPriceError(false);
      dispatch(changePrice(newPrice));
      setPrice(`${newPrice.toLocaleString(`ru-RU`)} рублей`);
    }
  };

  const loanFirstPaymentHandler = (evt) => {
    let newPayment;
    if (evt.target.value.search(`рублей`) > 0) {
      newPayment = getNumberFromString(evt.target.value, `рублей`);
    } else {
      newPayment = parseInt(evt.target.value, RADIX);
    }
    setPayment(`${newPayment.toString()}`);
    dispatch(changeFirstPayment(newPayment * FirstPaymentRate.MAX / price));
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
    setLoanTerm(`${newTerm.toString()}`);
    dispatch(changeLoanTerm(newTerm));
  };

  const loanTermCheckHandler = (evt) => {
    let newTerm;
    if (evt.target.value.search(`лет`) > 0) {
      newTerm = getNumberFromString(evt.target.value, `лет`);
    } else {
      newTerm = parseInt(evt.target.value, RADIX);
    }
    if (newTerm < minLoanTerm) {
      newTerm = minLoanTerm;
    } else if (newTerm > maxLoanTerm) {
      newTerm = maxLoanTerm;
    }
    setLoanTerm(`${newTerm.toLocaleString(`ru-RU`)} лет`);
    dispatch(changeLoanTerm(newTerm));
  };

  const loanTermRangeChangeHandler = (evt) => {
    const newTerm = evt.target.value;
    setLoanTerm(`${newTerm.toLocaleString(`ru-RU`)} лет`);
    dispatch(changeLoanTerm(newTerm));
  };

  return (
    <div className="loan-calculator__step2 step step2">
      <h3 className="step__title">Шаг 2. Введите параметры кредита</h3>
      <div className="step__label-wrapper">
        <button
          className="step__button button button--decrease"
          aria-label="Увеличить"
          onClick={priceDownClickHandler}
        >
          <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="16" y2="1" stroke="#1F1E25" strokeWidth="2"/>
          </svg>
        </button>
        <label className="step__label">
          {(purpose === LoanPurpose.MORTGAGE) ? `Стоимость недвижимости` : `Стоимость автомобиля`}
          <input
            value={(!isPriceError) ? isPrice : `Некорректное значение`}
            className={`step__field step2__field ${(isPriceError) && `field-error`}`}
            type="text"
            name="price"
            onClick={() => setPriceError(false)}
            onChange={priceChangeHandler}
            onBlur={priceCheckHandler}
          />
        </label>
        <span className="step__comments">От {minPrice.toLocaleString(`ru-RU`)}  до {maxPrice.toLocaleString(`ru-RU`)} рублей</span>
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
      <label className="step__label">
        Первоначальный взнос
        <input
          value={isFirstPayment}
          className="step__field step2__field"
          type="text"
          name="firstPayment"
          onChange={loanFirstPaymentHandler}
          onBlur={loanFirstPaymentCheckHandler}
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
      <span className="step__comments">{firstPaymentMin.toLocaleString(`ru-RU`)}%</span>
      <label className="step__label">
        Срок кредитования
        <input
          value={isLoanTerm}
          className="step__field step2__field"
          type="text"
          name="loanTerm"
          onChange={loanTermChangeHandler}
          onBlur={loanTermCheckHandler}
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
        <span className="step__comments">{minLoanTerm.toLocaleString(`ru-RU`)} лет</span>
        <span className="step__comments">{maxLoanTerm.toLocaleString(`ru-RU`)} лет</span>
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

export default Step2;
