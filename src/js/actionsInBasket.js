const LS_KEY_ADD_TO = 'Add-to-basket';
import {
  getDataFromLockalStorageByKey,
  setDataToLocalStorageByKey,
} from './localStorageService';
const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO) ?? [];
console.log(LSData);

const body = document.querySelector('body');
body.addEventListener('click', handleAddValueBtnClick);
body.addEventListener('click', handleReduceValueBtnClick);

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
  updateLSData(e);
  return;
}

function updateLSData(e) {
  const elem = e.target;
  const orderArticleIdelem = elem.closest('.js-articleId');
  const orderArticleId = orderArticleIdelem.id;
  const valueElem = orderArticleIdelem.querySelector('.js-value');
  const value = Number(valueElem.textContent);
  console.log(value);
  const newLSData = LSData.reduce((acc, el)=>{
  el.id === orderArticleId ? acc.push({id: orderArticleId, value}) : acc.push(el);
  return acc;}, []);
  console.log(newLSData);
  setDataToLocalStorageByKey(LS_KEY_ADD_TO, newLSData)
}

