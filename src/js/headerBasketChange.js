import { getDataFromLockalStorageByKey } from './localStorageService';
import { refs } from './refs';

export function headerBasketChange() {
  if (getDataFromLockalStorageByKey('Add-to-basket')) {
    refs.basketBtn.classList.remove('header-btn-basket');
    refs.basketBtn.classList.add('header-btn-basket-full');
  }
  if (!getDataFromLockalStorageByKey('Add-to-basket')) {
    refs.basketBtn.classList.add('header-btn-basket');
    refs.basketBtn.classList.remove('header-btn-basket-full');
  }
}
headerBasketChange();

// window.addEventListener('storage', e => {
//   console.log({ e }, JSON.parse(e.newValue).length > 0);
//   if (JSON.parse(e.newValue).length && JSON.parse(e.newValue).length > 0) {
//     console.log('yes');
//     changeForFull();
//   }
//   if (!getDataFromLockalStorageByKey('Add-to-basket')) {
//     refs.basketBtn.classList.add('header-btn-basket');
//     refs.basketBtn.classList.remove('header-btn-basket-full');
//   }
// });

// function changeForFull() {
//   refs.basketBtn.classList.remove('header-btn-basket');
//   refs.basketBtn.classList.add('header-btn-basket-full');
// }
