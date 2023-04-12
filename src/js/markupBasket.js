const LS_KEY_ADD_TO = 'Add-to-basket';
import { getDataFromLockalStorageByKey } from './localStorageService';

const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO) || [];

const basket = document.querySelector('.basket');
const basketSection = document.querySelector('.js-basket-section');

export function auditBasket(LSData) {
  const basketEmpty = `<section class="basket-empty"><div class="basket-empty-text-wrapper"><p class="basket-empty-title">Кошик порожній</p><p class="basket-empty-text">Але це ніколи  не пізно виправити :)</p></div>
   <a href="./index.html" class="basket-link-home" noopener noreferrer
      >Продовжити покупки</a
    ></section>`;
  if (LSData.length === 0) {
    basketSection.style.display = 'none';
    basket.innerHTML = basketEmpty;
  }
}
auditBasket(LSData);
