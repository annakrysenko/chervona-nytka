import { refs } from './refs.js';

(() => {
  // const burgerEl = document.querySelector('.burger-menu');
  // console.log(burgerEl);

  if (refs.closeMenuBtn) {
    refs.closeMenuBtn.addEventListener('click', e => {
      e.currentTarget.classList.toggle('burger-menu');
      e.currentTarget.classList.toggle('burger-menu-open');

      toggleModal();
    });
  }

  if (refs.headerMenu) {
    refs.headerMenu.addEventListener('click', toggleModal);
  }

  function toggleModal() {
    refs.headerMenu.classList.toggle('visually-hidden');
  }
})();
