import { getDataFromLockalStorageByKey } from './localStorageService';
import { refs } from './refs';

const data = getDataFromLockalStorageByKey('Add-to-basket');

export function headerBasketChange() {
  if (data && data.length > 0) {
    refs.basketBtn.classList.remove('header-btn-basket');
    refs.basketBtn.classList.add('header-btn-basket-full');
  }
  if (!data || getDataFromLockalStorageByKey('Add-to-basket').length === 0) {
    refs.basketBtn.classList.add('header-btn-basket');
    refs.basketBtn.classList.remove('header-btn-basket-full');
  }
}
headerBasketChange();


