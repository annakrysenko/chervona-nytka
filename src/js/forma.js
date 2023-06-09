import { data } from '../data';
import { getDataFromLockalStorageByKey } from './localStorageService';
import { parsePhoneNumberFromString, parsePhoneNumber } from 'libphonenumber-js';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const LS_KEY_ADD_TO = 'Add-to-basket';
const LS_KEY = 'selectedvalue';

const modal = document.querySelector('.backdrop');
const totalEl = document.querySelector('.basket-total-price');
const formEl = document.querySelector('.basket-form');
const closeBtn = document.querySelector('.modal-link-home');
const submBtn = document.querySelector('.basket-form_btn');

const orderData = {};
const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO) || [];

const today = new Date();
const day = today.getDate().toString().padStart(2, '0');
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const year = today.getFullYear().toString();

const formattedDate = `${day}.${month}.${year}`;

if (formEl) formEl.addEventListener('submit', handleSubmit);
if (formEl) formEl.addEventListener('change', handleChangeForm);
if (formEl) formEl.addEventListener('input', handleInputForm);

closeBtn.addEventListener('click', handleCloseModal);

const sendData = async data => {
  try {
    const response = await fetch(
      'https://events.sendpulse.com/events/id/1ec8e38825e044b1ec0cd982add80441/82967447',
      { method: 'POST', body: JSON.stringify(data) }
    );
    const msg = await response.json();
    console.log(msg);
  } catch (error) {
    console.log(error.message);
  }
};

const getOrderData = (data, phone) => {
  const id = `${Date.now()}`;
  return {
    email: `${id}@mail.com`,
    phone: phone,
    order: JSON.stringify(data, null, 2),
    id: `${id}`,
  };
};

const getDataToSend = data =>
  data.reduce((acc, obj1) => {
    // Якщо в data є об'єкти з такими самими id як в об'єктах з LSData, то знаходимо та вибираємо ці об'єкти:
    const obj2 = LSData.find(obj2 => Number(obj2.id) === obj1.id);
    if (obj2) {
      // Якщо знайдено відповідний об'єкт в LSData, то додаємо поле value до obj1
      acc.push({
        Назва: obj1.name,
        Ціна: String(obj1.price),
        Кількість: String(obj2.value),
      });
    }
    return acc;
  }, []);

function handleCloseModal() {
  modal.classList.toggle('is-hidden');
}
async function handleSubmit(e) {
  e.preventDefault();
  const dataToSend = getDataToSend(data);
  const total = totalEl.textContent;
  const elem = e.target;
  const phone = elem.tel.value;

  orderData['НОМЕР_ЗАМОВЛЕННЯ'] = `${Date.now()}`;
  orderData['ДАТА_ЗАМОВЛЕННЯ'] = `${formattedDate}`;
  orderData["ІМ'Я"] = elem.name.value;
  orderData['ТЕЛЕФОН'] = elem.tel.value;
  orderData['СЛУЖБА_ДОСТАВКИ'] = elem.postal.value;
  orderData['НОМЕР_ВІДДІЛЕННЯ'] = elem.department.value;
  orderData['МІСТО'] = elem.city.value;
  orderData['ЗАГАЛЬНА_СУМА'] = total;
  orderData['ТОВАРИ'] = dataToSend;

  sendData(getOrderData(orderData, phone));

  localStorage.removeItem(LS_KEY);
  localStorage.removeItem(LS_KEY_ADD_TO);

  handleCloseModal();
  formEl.reset();
}
function handleChangeForm(e) {
  let persistedFilters = localStorage.getItem(LS_KEY);
  persistedFilters = persistedFilters ? JSON.parse(persistedFilters) : {};

if (e.target.name === 'tel') {
  e.target.classList.remove('error-number');
  const phoneNumber = e.target.value;
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'UA');
  const country = parsePhoneNumber(phoneNumber, 'UA').country;
  const isValid = parsedPhoneNumber && parsedPhoneNumber.isValid() && country === 'UA';
  const formattedNumber = parsedPhoneNumber && parsedPhoneNumber.formatInternational();
  if (isValid) {
    e.target.value = formattedNumber;
    submBtn.disabled = false;
} else {
  Toastify({
    text: 'Вкажіть вірний номер телефону',
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true, 
    style: {
      background: "#b6061d",
      fontFamily: 'Roboto',
    },
  }).showToast();
  e.target.classList.add('error-number');
  submBtn.disabled = true;
}

}
  persistedFilters[e.target.name] = e.target.value;
  localStorage.setItem(LS_KEY, JSON.stringify(persistedFilters));
}
function initForm() {
  let persistedFilters = localStorage.getItem(LS_KEY);
  if (persistedFilters) {
    persistedFilters = JSON.parse(persistedFilters);
    Object.entries(persistedFilters).forEach(([name, value]) => {
      formEl.elements[name] ? (formEl.elements[name].value = value) : '';
    });
    const formInput = formEl.elements.tel;

    const phoneNumber = formInput.value;
    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'UA');
    const country = parsePhoneNumber(phoneNumber, 'UA').country;
    const isValid = parsedPhoneNumber && parsedPhoneNumber.isValid() && country === 'UA';
    console.log(isValid);
    if (!isValid) {
      submBtn.disabled = true;
      console.log(submBtn.disabled);
      formInput.classList.add('error-number');}
  } else submBtn.disabled = true;
}
initForm();

function handleInputForm(e) {
  if (e.target.name !== 'tel') return;
  if (e.target.classList.contains('error-number')) {
    e.target.classList.remove('error-number');
  }
  const phoneNumber = e.target.value;
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'UA');
  const country = parsePhoneNumber(phoneNumber, 'UA').country;
  const isValid = parsedPhoneNumber && parsedPhoneNumber.isValid() && country === 'UA';
  submBtn.disabled = isValid ? false: true;

}


