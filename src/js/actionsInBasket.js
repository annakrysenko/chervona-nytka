const LS_KEY_ADD_TO = 'Add-to-basket';
import {getDataFromLockalStorageByKey, setDataToLocalStorageByKey} from './localStorageService';
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
  return;
}

// function updateLSData(e) {
//     const elem = e.target;
//     const orderArticleIdelem = elem.closest('.js-articleId');
//     const id = orderArticleIdelem.id;
//     const valueElem = orderArticleIdelem.querySelector('.js-value');
//     const value = Number(valueElem.textContent);
//     const newLSData = LSData.reduce()
//     setDataToLocalStorageByKey(LS_KEY_ADD_TO, [...dataByLs, ...[{id, value}]]);
// }


// const fullDataInBasket = LSData.reduce((acc, obj1) => {
//     // Якщо в data є об'єкти з такими самими id як в об'єктах з LSData, то знаходимо та вибираємо ці об'єкти:
//         const obj2 = LSData.find(obj2 => Number(obj2.id) === obj1.id);
//         if (obj2) {
//           // Якщо знайдено відповідний об'єкт в LSData, то додаємо поле value до obj1
//           acc.push({ ...obj1, value: obj2.value });
//         }
//         return acc;
//       }, []);