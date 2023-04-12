import { data } from '../data';
import { refs } from './refs';

const LS_KEY_ADD_TO = 'Add-to-basket';
import { getDataFromLockalStorageByKey } from './localStorageService';

const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO) || [];

const fullDataInBasket = data.reduce((acc, obj1) => {
  // Якщо в data є об'єкти з такими самими id як в об'єктах з LSData, то знаходимо та вибираємо ці об'єкти:
  const obj2 = LSData.find(obj2 => Number(obj2.id) === obj1.id);
  if (obj2) {
    // Якщо знайдено відповідний об'єкт в LSData, то додаємо поле value до obj1
    acc.push({ ...obj1, value: obj2.value });
  }
  return acc;
}, []);

const renderMarkupArticlesInBasket = () => {
  const markup = fullDataInBasket
    .map(({ id, name, price, url, value }) => {
      return ` 
        <li class="basket-list_item js-articleId" id="${id}">
        <div class="basket-item-wrapper">
          <div class="basket-item-info">
            <div class="basket-item_title-wrapper">
              <div class="basket-item_title">
                <h3 class="basket-subtitle">
                  ${name}
                </h3>
              </div>

              <div><p class="basket-item-price">${price} грн</p></div>
            </div>
            <div class="counter basket" data-action="counter">
              <button
                class="order-decrement js-reduce"
                type="button"
                data-action="decrement"
              >
                -
              </button>
              <div class="order-value js-value" data-action="value">${value}</div>
              <button
                class="order-increment js-add"
                type="button"
                data-action="increment"
              >
                +
              </button>
            </div>
          </div>
          <div class="basket-item_thumb">
            <img
              class="basket-item_img"
              src="${url}"
              alt="${name}"
              width="280"
              height="280"
            />
          </div>
        </div>
      </li>
        `;
    })
    .join('');

  if (refs.basketListEl)
    refs.basketListEl.insertAdjacentHTML('beforeend', markup);
};

renderMarkupArticlesInBasket();
