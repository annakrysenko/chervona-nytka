import { refs } from './refs.js';

(() => {
  if (refs.closeMenuBtn) {
    refs.closeMenuBtn.addEventListener('click', toggleModal);
  }

  if (refs.headerMenu) {
    refs.headerMenu.addEventListener('click', toggleModal);
  }

  function toggleModal() {
    refs.headerMenu.classList.toggle('visually-hidden');
  }
})();
