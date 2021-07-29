import {RADIX} from './const';

export const popupOpenHandler = (setAction) => {
  const scrollY = window.pageYOffset;
  const screenWidth = document.body.clientWidth;
  document.body.style.position = `fixed`;
  document.body.style.minWidth = `${screenWidth}px`;
  document.body.style.top = `-${scrollY}px`;
  setAction(true);
};

export const popupCloseHandler = (setAction) => {
  const scrollY = document.body.style.top;
  document.body.style.position = ``;
  document.body.style.top = ``;
  document.body.style.minWidth = `320px`;
  window.scrollTo(0, parseInt(scrollY || `0`, RADIX) * -1);
  setAction(false);
};

export const getNumberFromString = (string, key) => {
  const cutIndex = string.search(key);
  return parseInt(string.slice(0, cutIndex - 1).replaceAll(/\s/g, ``), RADIX);
};

export const onMenuLinkClick = (link) => {
  const scrollTarget = document.getElementById(link);
  if (scrollTarget) {
    const topOffset = document.querySelector(`header`).offsetHeight;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: `smooth`
    });
  }
};

export const completePopupOpen = (setAction) => {
  const goTo = document.querySelector(`#loan`);
  const gotoBlockValue = goTo.getBoundingClientRect().top + pageYOffset - document.querySelector(`header`).offsetHeight;
  window.scrollTo({
    top: gotoBlockValue
  });
  popupOpenHandler(setAction);
};
