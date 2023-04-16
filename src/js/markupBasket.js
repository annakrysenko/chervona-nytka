const LS_KEY_ADD_TO = 'Add-to-basket';
import { getDataFromLockalStorageByKey } from './localStorageService';
import { refs } from './refs';

const LSData = getDataFromLockalStorageByKey(LS_KEY_ADD_TO) || [];

const basket = document.querySelector('.basket');
const basketSection = document.querySelector('.js-basket-section');

export function auditBasket(LSData) {
  const basketEmpty = `<section class="basket-empty"><div class="basket-empty-text-wrapper"><p class="basket-empty-title">Кошик порожній</p><p class="basket-empty-text">Але це ніколи  не пізно виправити :)</p></div>
   <button data-section="allOffersSection" class="basket-link-home" type="button" 
      >Продовжити покупки</button></section>`;
  if (LSData.length === 0) {
    basketSection.style.display = 'none';
    basket.innerHTML = basketEmpty;

    // додала слухач на кнопку
    basket.addEventListener('click', e => {
      if (e.target.nodeName !== 'BUTTON') {
        return;
      }
      localStorage.setItem('scroll', e.target.dataset.section);
      document.location.pathname = '/chervona-nytka/index.html';
    });
  }
}
auditBasket(LSData);
