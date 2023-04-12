import { data } from '../data';
import { getDataFromLockalStorageByKey } from './localStorageService';
const LS_KEY = 'selectedvalue';
const LOCALSTORAGE_KEY = 'selectedvalues';
const form = document.querySelector('.basket-form');
const formBtn = document.querySelector('.basket-form_btn')


const LS_KEY_ADD_TO = 'Add-to-basket';
const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO) || [];
const fullDataInBasket = (data) => data.reduce((acc, obj1) => {
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
    console.log(formData);
    formData.forEach((value, name)=> console.log(value, name));
    // localStorage.removeItem(LS_KEY);
}

function handleChangeForm(e) {
    let persistedFilters = localStorage.getItem(LS_KEY);
    persistedFilters = persistedFilters? JSON.parse(persistedFilters):{};
    persistedFilters[e.target.name] = e.target.value;
    localStorage.setItem(LS_KEY, JSON.stringify(persistedFilters));
}


function initForm() {
    let persistedFilters = localStorage.getItem(LS_KEY);
    if (persistedFilters) { persistedFilters = JSON.parse(persistedFilters);
        Object.entries(persistedFilters).forEach(([name, value])=>{
            form.elements[name].value = value;
        })
    }

}
