import {getDataFromLockalStorageByKey, setDataToLocalStorageByKey, checkLS} from './localStorageService';
import { refs } from './refs';

const LS_KEY_ADD_TO = 'Add-to-basket';

const body = document.querySelector('body');
const specialReduceBtn = document.querySelector('.js-reduce-special');
const specialAddeBtn = document.querySelector('.js-add-special');
const specialOrdereBtn = document.querySelector('.js-order-special');

body.addEventListener('click', handleAddValueBtnClick);
body.addEventListener('click', handleReduceValueBtnClick);
body.addEventListener('click', handleOrderBtnClick);
specialReduceBtn.addEventListener('click', handleReduceSpecialBtnClick);
specialAddeBtn.addEventListener('click', handleAddSpecialBtnClick);
specialOrdereBtn.addEventListener('click', handleOrderSpecialBtnClick);

// checkLS(LS_KEY_ADD_TO);
if (refs.specials)
  refs.specials.addEventListener('click', handleSpecialBtnClick);

function handleAddValueBtnClick(e) {
  const elem = e.target;
  const addBtn = elem.closest('.js-add');
  if (elem !== addBtn) return;
  let valueOutput = elem.previousElementSibling;
  let value = Number(valueOutput.textContent);
  value += 1;
  valueOutput.textContent = value;
  return;
}

function handleReduceValueBtnClick(e) {
  const elem = e.target;
  const reduceBtn = elem.closest('.js-reduce');
  if (elem !== reduceBtn) return;
  let valueOutput = elem.nextElementSibling;
  let value = Number(valueOutput.textContent);
  value = value <= 0 ? 0 : value - 1;
  valueOutput.textContent = value;
  return;
}

function handleOrderBtnClick(e) {
  const elem = e.target;
  const orderBtn = elem.closest('.js-order');
  if (elem !== orderBtn) return;
  const orderArticleIdelem = elem.closest('.js-articleId');
  const id = orderArticleIdelem.id;
  const valueElem = orderArticleIdelem.querySelector('.js-value');
  const addBtn = orderArticleIdelem.querySelector('.js-add');
  const reduceBtn = orderArticleIdelem.querySelector('.js-reduce');
  const value = Number(valueElem.textContent);
  if (value === 0) return;
  const dataByLs = checkLS(LS_KEY_ADD_TO);
  const check = checkLSById(id);
  if (check) {
    alert('Ця нитка вже додана. Перейдіть в кошик для завершення замовлення.');
    return;
  }
  setDataToLocalStorageByKey(LS_KEY_ADD_TO, [...dataByLs, ...[{ id, value }]]);
  orderBtn.textContent = "В кошику";
  addBtn.setAttribute('disabled', 'disabled');
  reduceBtn.setAttribute('disabled', 'disabled');
  const basketBtnFull = document.querySelector('.header-btn-basket-full');
  if (!basketBtnFull) refs.basketBtn.classList.add('header-btn-basket-full');
}

function handleSpecialBtnClick() {
  const dataByLs = checkLS(LS_KEY_ADD_TO);
  const check = checkLSById(1);
  if (check) {
    // alert('Ця нитка вже додана. Перейдіть в кошик для завершення замовлення.');
    return;
  }
  setDataToLocalStorageByKey(LS_KEY_ADD_TO, [
    ...dataByLs,
    ...[{ id: 1, value: 1 }],
  ]);
}

function checkLSById(id) {
  let data = getDataFromLockalStorageByKey(LS_KEY_ADD_TO);
  return data.find(article => article.id === id);
}

function handleAddValueBtnClick(e) {
  const elem = e.target;
  const addBtn = elem.closest('.js-add');
  if (elem !== addBtn) return;
  let valueOutput = elem.previousElementSibling;
  let value = Number(valueOutput.textContent);
  value += 1;
  valueOutput.textContent = value;
  return;
}

function handleReduceSpecialBtnClick(e) {
  const elem = e.target;
  const orderArticleElem = elem.closest('.js-articleId');

  let valueOutput = orderArticleElem.querySelector('.js-value');
  let value = Number(valueOutput.textContent);
  value = value <= 0 ? 0 : value - 5;
  valueOutput.textContent = value;
  return;
}

function handleAddSpecialBtnClick(e) {
  const elem = e.target;
  const orderArticleElem = elem.closest('.js-articleId');

  let valueOutput = orderArticleElem.querySelector('.js-value');
  let value = Number(valueOutput.textContent);
  value += 5;
  valueOutput.textContent = value;
  return;
}

function handleOrderSpecialBtnClick(e) {
  const elem = e.target;
  const orderArticleIdelem = elem.closest('.js-articleId');
  const id = orderArticleIdelem.id;
  const valueElem = orderArticleIdelem.querySelector('.js-value');
  const value = Number(valueElem.textContent);
  if (value === 0) return;
  const dataByLs = checkLS(LS_KEY_ADD_TO);
  const check = checkLSById(id);
  if (check) {
    alert('Ця нитка вже додана. Перейдіть в кошик для завершення замовлення.');
    return;
  }
  setDataToLocalStorageByKey(LS_KEY_ADD_TO, [...dataByLs, ...[{ id, value }]]);
  specialOrdereBtn.textContent = "В кошику";
  specialAddeBtn.setAttribute('disabled', 'disabled');
  specialReduceBtn.setAttribute('disabled', 'disabled');
  const basketBtnFull = document.querySelector('.header-btn-basket-full');
  if (!basketBtnFull) refs.basketBtn.classList.add('header-btn-basket-full');
}
