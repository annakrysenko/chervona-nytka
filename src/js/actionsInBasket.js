const LS_KEY_ADD_TO = 'Add-to-basket';
import {
  getDataFromLockalStorageByKey,
  setDataToLocalStorageByKey,
} from './localStorageService';
import { auditBasket } from './markupBasket';

const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO) ?? [];
const body = document.querySelector('body');
body.addEventListener('click', handleAddValueBtnClick);
body.addEventListener('click', handleReduceValueBtnClick);
body.addEventListener('click', handleRemoveEl);

function handleRemoveEl(e) {
  const elem = e.target;
  if (!elem.classList.contains('basket-delete-btn')) return;
  const article = elem.closest('.js-articleId');
  const idCard = article.id;
  const newLSData = LSData.filter(el => Number(el.id) !== Number(idCard));
  if (newLSData.length === 0) auditBasket(newLSData);
  setDataToLocalStorageByKey(LS_KEY_ADD_TO, newLSData);
  location.reload();
  return;
}

function handleAddValueBtnClick(e) {
  const elem = e.target;
  if (!elem.classList.contains('js-add')) return;
  const orderArticleIdelem = elem.closest('.js-articleId');
  const priceItem = orderArticleIdelem.querySelector('.basket-item-price');
  const price = Number(priceItem.dataset.price);
  let valueOutput = elem.previousElementSibling;
  let value = Number(valueOutput.textContent);
  value += 1;
  valueOutput.textContent = value;
  priceItem.textContent = value * price;
  uppDateTotalPrice();
  updateLSData(e);
  return;
}

function handleReduceValueBtnClick(e) {
  const elem = e.target;
  if (!elem.classList.contains('js-reduce')) return;
  const orderArticleIdelem = elem.closest('.js-articleId');
  const priceItem = orderArticleIdelem.querySelector('.basket-item-price');
  const price = Number(priceItem.dataset.price);
  let valueOutput = elem.nextElementSibling;
  let value = Number(valueOutput.textContent);
  value = value <= 1 ? 1 : value - 1;
  valueOutput.textContent = value;
  priceItem.textContent = value * price;
  uppDateTotalPrice();
  updateLSData(e);
  return;
}

function updateLSData(e) {
  const elem = e.target;
  const orderArticleIdelem = elem.closest('.js-articleId');
  const orderArticleId = orderArticleIdelem.id;
  const valueElem = orderArticleIdelem.querySelector('.js-value');
  const value = Number(valueElem.textContent);
  const newLSData = LSData.reduce((acc, el) => {
    el.id === orderArticleId
      ? acc.push({ id: orderArticleId, value })
      : acc.push(el);
    return acc;
  }, []);
  setDataToLocalStorageByKey(LS_KEY_ADD_TO, newLSData);
  return;
}

function uppDateTotalPrice() {
  const totalPrice = document.querySelector('.basket-total-price');
  const priceItems = document.querySelectorAll('.basket-item-price');
  let totalValuePrice = 0;
  priceItems.forEach(function (elem) {
    totalValuePrice += Number(elem.textContent);
  });
  if (totalPrice) {
    totalPrice.innerHTML = totalValuePrice;
  }
}

const specialReduceBtn = document.querySelector('.js-reduce-special');
const specialAddeBtn = document.querySelector('.js-add-special');
if (specialReduceBtn)
  specialReduceBtn.addEventListener('click', handleReduceSpecialBtnClick);
if (specialAddeBtn)
  specialAddeBtn.addEventListener('click', handleAddSpecialBtnClick);

function handleReduceSpecialBtnClick(e) {
  const elem = e.target;
  const orderArticleElem = elem.closest('.js-articleId');
  const priceItem = orderArticleElem.querySelector('.basket-item-price');
  const price = Number(priceItem.dataset.price);
  let valueOutput = orderArticleElem.querySelector('.js-value');
  let value = Number(valueOutput.textContent);
  value =
    value <= 1
      ? 1
      : value === 5
      ? 1
      : value > 5 && value <= 20
      ? value - 5
      : value - 30;
  valueOutput.textContent = value;
  if (value === 1) priceItem.textContent = value * price;
  if (value === 5) priceItem.textContent = 100;
  if (value >= 10 && value < 50) priceItem.textContent = value * 18;
  if (value === 50) priceItem.textContent = 750;
  uppDateTotalPrice();
  updateLSData(e);
  return;
}

function handleAddSpecialBtnClick(e) {
  const elem = e.target;
  const orderArticleElem = elem.closest('.js-articleId');
  const priceItem = orderArticleElem.querySelector('.basket-item-price');
  const price = Number(priceItem.dataset.price);
  let valueOutput = orderArticleElem.querySelector('.js-value');
  let value = Number(valueOutput.textContent);
  value =
    value < 1
      ? (value = 1)
      : value === 1
      ? (value += 4)
      : value >= 5 && value < 20
      ? (value += 5)
      : (value = 50);
  valueOutput.textContent = value;
  if (value === 1) priceItem.textContent = value * price;
  if (value === 5) priceItem.textContent = 100;
  if (value >= 10 && value < 50) priceItem.textContent = value * 18;
  if (value === 50) priceItem.textContent = 750;
  uppDateTotalPrice();
  updateLSData(e);
  return;
}

uppDateTotalPrice();
