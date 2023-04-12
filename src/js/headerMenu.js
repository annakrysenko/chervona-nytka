import { refs } from './refs.js';

(() => {
  // const burgerEl = document.querySelector('.burger-menu');
  // console.log(burgerEl);

  if (refs.closeMenuBtn) {
    refs.closeMenuBtn.addEventListener('click', e => {
      toggleModal();
    });
  }

  if (refs.headerMenu) {
    refs.headerMenu.addEventListener('click', toggleModal);
  }

  function toggleModal() {
    refs.headerMenu.classList.toggle('visually-hidden');
    refs.burgerEl.classList.toggle('burger-menu');
    refs.burgerEl.classList.toggle('burger-menu-open');
  }
})();
