import React from 'react';

const Step3 = () => {
  return (
    <div className="loan-calculator__step3 step step3">
      <h3 className="step3__title">Шаг 3. Оформление заявки</h3>
      <ul className="step3__list">
        <li className="step3__item">
          <span className="step3__name">Номер заявки</span>
          <span className="step3__data">№ 0010</span>
        </li>
        <li className="step3__item">
          <span className="step3__name">Цель кредита</span>
          <span className="step3__data">Ипотека</span>
        </li>
        <li className="step3__item">
          <span className="step3__name">Стоимость недвижимости</span>
          <span className="step3__data">2 000 000 рублей</span>
        </li>
        <li className="step3__item">
          <span className="step3__name">Первоначальный взнос</span>
          <span className="step3__data">200 000 рублей</span>
        </li>
        <li className="step3__item">
          <span className="step3__name">Срок кредитования</span>
          <span className="step3__data">5 лет</span>
        </li>
      </ul>
    </div>
  );
};

export default Step3;
