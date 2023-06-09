import { data } from '../data';
import { refs } from './refs';
const LS_KEY_ADD_TO = 'Add-to-basket';
import { getDataFromLockalStorageByKey } from './localStorageService';
const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO) || [];

export const fullDataInBasket = data.reduce((acc, obj1) => {
  // Якщо в data є об'єкти з такими самими id як в об'єктах з LSData, то знаходимо та вибираємо ці об'єкти:
  const obj2 = LSData.find(obj2 => Number(obj2.id) === obj1.id);
  if (obj2) {
    // Якщо знайдено відповідний об'єкт в LSData, то додаємо поле value до obj1
    acc.push({ ...obj1, value: obj2.value });
  }
  return acc;
}, []);

export const renderMarkupArticlesInBasket = fullDataInBasket => {
  const markup = fullDataInBasket
    .map(({ id, name, price, url, value }) => {

      const priceItem = value * Number(price);
      const calculateSpecItemPrice = (value) =>{
        if (value === 1) return 25;
        if (value === 5) return  100;
        if (value === 10) return  180;
        if (value > 10 && value < 50) return  value * 18;
        if (value === 50) return  750;
      }
      const priceItemSpecial = calculateSpecItemPrice(value);


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
              <div class="basket-item-price-wrapper"><p class="basket-item-price ${id === 1 ? 'js-first-position' : ''}" data-price="${price}">${id === 1 ? priceItemSpecial : priceItem} </p><span class="valute">грн</span></div>
              <button type="button" class="basket-delete-btn" id="${id}">&#10005;</button>
            </div>
            <div class="counter counter-basket basket" data-action="counter">
              <button
                class="order-decrement ${id === 1 ? "js-reduce-special": "js-reduce"}"
                type="button"
                data-action="decrement"
              >
              &#8722;
              </button>
              <div class="order-value js-value" data-action="value">${value}</div>
              <button
                class="order-increment ${id === 1? "js-add-special": "js-add"}"
                type="button"
                data-action="increment"
              >
              &#43;
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

  if (refs.basketListEl) refs.basketListEl.innerHTML = markup;
};

renderMarkupArticlesInBasket(fullDataInBasket);
