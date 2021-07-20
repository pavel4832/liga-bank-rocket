import React, {useRef, useState} from 'react';
import {LoanPurpose, PurposeValue} from '../../../const';
import {useDispatch} from 'react-redux';
import {changePurpose} from '../../../store/actions';

const Step1 = () => {
  const [isClose, setClose] = useState(false);
  const purpose = useRef();

  const dispatch = useDispatch();

  const openPurposeHandler = () => {
    setClose(!isClose);
  };

  const choiceClickHandler = (evt) => {
    evt.preventDefault();
    const choice = evt.target.dataset.choice;
    purpose.current.value = PurposeValue[choice];
    dispatch(changePurpose(choice));
    openPurposeHandler();
  };

  return (
    <div className="loan-calculator__step1 step step1">
      <h3 className="step__title">Шаг 1. Цель кредита</h3>
      <label className="step__label">
        <input
          ref={purpose}
          aria-label="Цель кредита"
          className="step__field"
          type="text"
          name="purpose"
          placeholder="Выберите цель кредита"
          onClick={openPurposeHandler}
          readOnly={true}
        />
        <button
          className={`step__button button ${(isClose) && `button--close`}`}
          aria-label={(!isClose) ? `Открыть` : `Закрыть`}
          onClick={openPurposeHandler}
        >
          <svg width="18" height="11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l8 8 8-8" stroke="#1F1E25" strokeWidth="2"/>
          </svg>
        </button>
        <ul className={`step1__list ${(isClose) && `active`}`}>
          <li className="step1__choice">
            <a
              href="#" className="step1__link"
              data-choice={LoanPurpose.MORTGAGE}
              onClick={choiceClickHandler}
            >Ипотечное кредитование</a>
          </li>
          <li className="step1__choice">
            <a
              href="#"
              className="step1__link"
              data-choice={LoanPurpose.AUTO}
              onClick={choiceClickHandler}
            >Автомобильное кредитование</a>
          </li>
        </ul>
      </label>
    </div>
  );
};

export default Step1;
