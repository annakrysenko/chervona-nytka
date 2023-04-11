import { handleCloseModal } from './modal-open-close';

const basketList = document.querySelector(`.basket-list`);

const renderBasket = data => {
  const basketItem = data
    .map(({ id, name, price, url, value }) => {
      return ` <li class="basket-list_item" id=${id}>
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
                class="order-decrement"
                type="button"
                data-action="decrement"
              >
                -
              </button>
              <div class="order-value" data-action="value">${value}</div>
              <button
                class="order-increment"
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
              src=${url}
              alt="Нитка з кулоном “Ангел”"
              width="280"
              height="280"
            />
          </div>
        </div>
      </li>`;
    })
    .join('');

  return basketItem;
};
