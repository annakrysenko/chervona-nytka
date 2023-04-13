import { data } from '../data';
const LS_KEY_ADD_TO = 'Add-to-basket';
import { data } from '../data';
import { renderMarkupArticlesInBasket } from './basketItems';
import {
  getDataFromLockalStorageByKey,
  setDataToLocalStorageByKey,
} from './localStorageService';
import { auditBasket } from './markupBasket';
import { handleCloseModal } from './modal-open-close';

const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO) ?? [];
const body = document.querySelector('body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('.basket-form_btn');
body.addEventListener('click', handleAddValueBtnClick);
body.addEventListener('click', handleReduceValueBtnClick);
body.addEventListener('click', handleRemoveEl);

function handleRemoveEl(e) {
  const elem = e.target;
  const article = elem.closest('.js-articleId');
  const removeBtn = article.querySelector('.basket-delete-btn');
  if (elem !== removeBtn) return;
  const idCard = article.id;
  const newLSData = LSData.filter(el => Number(el.id) !== Number(idCard));
  if (newLSData.length === 0) auditBasket(newLSData);
  setDataToLocalStorageByKey(LS_KEY_ADD_TO, newLSData);
  location.reload();
}

function handleAddValueBtnClick(e) {
  const elem = e.target;
  const orderArticleIdelem = elem.closest('.js-articleId');
  const addBtn = orderArticleIdelem.querySelector('.js-add');
  const priceItem = orderArticleIdelem.querySelector('.basket-item-price');
  const price = Number(priceItem.dataset.price);
  if (elem !== addBtn) return;
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
  const orderArticleIdelem = elem.closest('.js-articleId');
  const reduceBtn = elem.closest('.js-reduce');
  const priceItem = orderArticleIdelem.querySelector('.basket-item-price');
  const price = Number(priceItem.dataset.price);
  if (elem !== reduceBtn) return;
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

uppDateTotalPrice();
