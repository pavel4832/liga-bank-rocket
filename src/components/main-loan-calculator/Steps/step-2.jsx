import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {PRICES_DATA, FIRST_PAYMENT_RATE, LOAN_TERM, LoanPurpose} from '../../../const';

const Step2 = () => {
  const {purpose, startPrice} = useSelector((state) => state.DATA);

  const price = useRef();
  const firstPayment = useRef();
  const loanTerm = useRef();

  const maxLoanTerm = (purpose === LoanPurpose.MORTGAGE) ? LOAN_TERM.MAX_MORTGAGE : LOAN_TERM.MAX_AUTO;

  return (
    <div className="loan-calculator__step2 step step2">
      <h3 className="step__title">Шаг 2. Введите параметры кредита</h3>
      <label className="step__label">
        Стоимость недвижимости
        <button
          className="step__button button button--decrease"
          aria-label="Увеличить"
        >
          <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="16" y2="1" stroke="#1F1E25" strokeWidth="2"/>
          </svg>
        </button>
        <input
          ref={price}
          value={`${startPrice.toLocaleString(`ru-RU`)} рублей`}
          className="step__field step2__field"
          type="text"
          name="price"
        />
        <button
          className="step__button button button--increase"
          aria-label="Уменьшить"
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
          ref={firstPayment}
          value={`${(startPrice / FIRST_PAYMENT_RATE.MIN).toLocaleString(`ru-RU`)} рублей`}
          className="step__field step2__field"
          type="text"
          name="firstPayment"
        />
        <input className="step__range" type="range" min="0" max="100" step="1" value="5" />
        <span className="step__comments">{FIRST_PAYMENT_RATE.MIN.toLocaleString(`ru-RU`)}%</span>
      </label>
      <label className="step__label">
        Срок кредитования
        <input
          ref={loanTerm}
          value={`${LOAN_TERM.MIN.toLocaleString(`ru-RU`)} лет`}
          className="step__field step2__field"
          type="text"
          name="loanTerm"
        />
        <input className="step__range" type="range" min="0" max="100" step="1" value="5" />
        <div className="step__comments-list">
          <span className="step__comments">{LOAN_TERM.MIN.toLocaleString(`ru-RU`)} лет</span>
          <span className="step__comments">{maxLoanTerm.toLocaleString(`ru-RU`)} лет</span>
        </div>
      </label>
    </div>
  );
};

export default Step2;
