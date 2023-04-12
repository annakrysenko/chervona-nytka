import { data } from '../data';
import { refs } from './refs';

const LS_KEY_ADD_TO = 'Add-to-basket';
import {getDataFromLockalStorageByKey, checkValueInLSById} from './localStorageService';


const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO) || [];

const IDs = LSData.map(data=>Number(data.id));

const renderMarkupAllOffers = () => {
  const markup = data
    .map(({ id, name, price, url }) => {
      const isInBasket = IDs.includes(id);
      return `      
      <li class="offers-item js-articleId" id="${id}">
      <div class="offers-item-wrapper">
        <div class="offers-thumb">
          <img
            class="offers-img"
            src="${url}"
            alt="${name}"
            width="370"
          />
        </div>
        <h3 class="offers-subtitle">${name}</h3>
        <p class="offers-text">${price}</p>
        <div class="counter" data-action="counter">
          <button
          ${isInBasket? 'disabled' :''}
            class="order-decrement js-reduce"
            type="button"
            data-action="decrement"
          >
            -1
          </button>
          <div class="order-value js-value" data-action="value">${isInBasket? checkValueInLSById(LS_KEY_ADD_TO, id) : 0 }</div>
          <button
          ${isInBasket? 'disabled' :''}
            class="order-increment js-add"
            type="button"
            data-action="increment"
          >
            +1
          </button>
        </div>
      </div>
      <button class="order-btn js-order">${isInBasket?'В кошику':'Замовити'}</button>
    </li>`;
    })
    .join('');

    if (refs.offersList) refs.offersList.insertAdjacentHTML('beforeend', markup);
};

renderMarkupAllOffers();
