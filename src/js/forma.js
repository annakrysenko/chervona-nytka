import { data } from '../data';
import { getDataFromLockalStorageByKey } from './localStorageService';
const LS_KEY = 'selectedvalue';

const form = document.querySelector('.basket-form');

const LS_KEY_ADD_TO = 'Add-to-basket';
const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO) || [];
const fullDataInBasket = data =>
  data.reduce((acc, obj1) => {
    // Якщо в data є об'єкти з такими самими id як в об'єктах з LSData, то знаходимо та вибираємо ці об'єкти:
    const obj2 = LSData.find(obj2 => Number(obj2.id) === obj1.id);
    if (obj2) {
      // Якщо знайдено відповідний об'єкт в LSData, то додаємо поле value до obj1
      acc.push({ ...obj1, value: obj2.value });
    }
    return acc;
  }, []);
const dataFromLS = fullDataInBasket(data);
console.log(...dataFromLS);

form.addEventListener('submit', handleSubmit);
form.addEventListener('change', handleChangeForm);

initForm();

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  formData.append('order', ...dataFromLS);
  let response = await fetch('sendmail.php', {
    method: 'POST',
    body: 'formData',
  });
  if (response.ok) {
    //spiner need classList.add("lkdmsm")
    let result = await response.json();
    alert(result.message);
    removeLS();
    handleCloseModal();
    form.reset();
    //classList.remove("ksjdxnj")
  } else {
    alert('error');
    //classList.remove("ksjdxnj")
  }
  // console.log(formData);
  // formData.forEach((value, name)=> console.log(value, name));
  localStorage.removeItem(LS_KEY);
}

function handleChangeForm(e) {
  let persistedFilters = localStorage.getItem(LS_KEY);
  persistedFilters = persistedFilters ? JSON.parse(persistedFilters) : {};
  persistedFilters[e.target.name] = e.target.value;
  localStorage.setItem(LS_KEY, JSON.stringify(persistedFilters));
}

function initForm() {
  let persistedFilters = localStorage.getItem(LS_KEY);
  if (persistedFilters) {
    persistedFilters = JSON.parse(persistedFilters);
    Object.entries(persistedFilters).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
