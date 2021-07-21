import {RADIX} from "./const";

export const popupOpenHandler = (setAction) => {
  const scrollY = window.pageYOffset;
  const screenWidth = document.body.clientWidth;
  document.body.style.position = `fixed`;
  document.body.style.minWidth = `${screenWidth}px`;
  document.body.style.top = `-${scrollY}px`;
  setAction(true);
}

export const popupCloseHandler = (setAction) => {
  const scrollY = document.body.style.top;
  document.body.style.position = ``;
  document.body.style.top = ``;
  document.body.style.minWidth = `320px`;
  window.scrollTo(0, parseInt(scrollY || `0`, RADIX) * -1);
  setAction(false);
};
