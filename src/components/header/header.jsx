import React, {useState} from 'react';
import HeaderMenu from "../header-menu/header-menu";
import UserBlock from '../user-block/user-block';
import {useDispatch} from 'react-redux';
import {changeMenu} from '../../store/actions';
import {MenuType} from '../../const';

const Header = () => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();

  return (
    <header className="page-header">
      <div className="container">
        <div className="page-header__wrapper">
          <div className="page-header__logo logo">
            <a
              href="#"
              className="logo__link"
              onClick={() => {
                dispatch(changeMenu(MenuType.SERVICES));
              }}
            >
              <div className="logo__wrapper">
                <picture>
                  <source media="(min-width: 768px)" type="image/svg+xml" srcSet="./img/logo-icon.svg"/>
                  <img className="logo__image" src="./img/logo-icon-mobile.svg" alt="Лого"/>
                </picture>
                <p className="logo__text">ЛИГА&nbsp;Банк</p>
              </div>
            </a>
          </div>
          <HeaderMenu isActive={isActive} setActive={setActive}/>
          <UserBlock isMobile={false} isMenuOpen={isActive} setActive={setActive}/>
        </div>
      </div>
    </header>
  );
};

export default Header;
