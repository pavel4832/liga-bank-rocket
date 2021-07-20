import React from 'react';
import Step1 from './Steps/step-1';
import Step2 from './Steps/step-2';
import {useSelector} from 'react-redux';

const MainLoanCalculator = () => {
  const {purpose} = useSelector((state) => state.DATA);

  return (
    <section className="page-main__loan loan-calculator">
      <div className="container">
        <h2 className="loan-calculator__title">Кредитный калькулятор</h2>
        <div className="loan-calculator__wrapper">
          <Step1 />
          {(purpose) && <Step2 purpose={purpose} />}
        </div>
      </div>
    </section>
  );
};

export default MainLoanCalculator;
