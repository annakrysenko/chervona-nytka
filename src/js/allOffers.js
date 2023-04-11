// {
//     "id": 1,
//     "name": "Нитка",
//     "price": 25,
//     "url" : "./images/threads-for-desktop/thread.png"
//   },

import { data } from '../data';
import { refs } from './refs';
const LS_KEY_ADD_TO = 'Add-to-basket';
import {getDataFromLockalStorageByKey} from './localStorageService';
const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO);
console.log(LSData);

const array2 = [2, 3, 11]; // масив з id

// const checkBasket = LSData.some(obj => array2.includes(obj.id));

const renderMarkupAllOffers = () => {
  const markup = data
    .map(({ id, name, price, url }) => {
      const isInBasket = array2.includes(id);
      console.log(isInBasket);
      return `      
      <li class="offers-item js-articleId" id="${id}">
      <div class="offers-item-wrapper">
        <div class="offers-thumb">
          <img
            class="offers-img"
            src="${images}"
            alt="${name}"
            width="370"
          />
        </div>
        <h3 class="offers-subtitle">${name}</h3>
        <p class="offers-text">${price}</p>
        <div class="counter" data-action="counter">
          <button
            class="order-decrement js-reduce"
            type="button"
            data-action="decrement"
          >
            -1
          </button>
          <div class="order-value js-value" data-action="value">0</div>
          <button
            class="order-increment js-add"
            type="button"
            data-action="increment"
          >
            +1
          </button>
        </div>
      </div>
      <button class="order-btn js-order">${isInBasket? 'в кошику': 'замовити'}</button>
    </li>`;
    })
    .join('');

    if (refs.offersList) refs.offersList.insertAdjacentHTML('beforeend', markup);
};

renderMarkupAllOffers();
