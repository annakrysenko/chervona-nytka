import { getDataFromLockalStorageByKey } from './localStorageService';
import { refs } from './refs';

export function headerBasketChange() {
  if (getDataFromLockalStorageByKey('Add-to-basket').length > 0) {
    refs.basketBtn.classList.remove('header-btn-basket');
    refs.basketBtn.classList.add('header-btn-basket-full');
  }
  if (getDataFromLockalStorageByKey('Add-to-basket').length === 0) {
    refs.basketBtn.classList.add('header-btn-basket');
    refs.basketBtn.classList.remove('header-btn-basket-full');
  }
}
headerBasketChange();


