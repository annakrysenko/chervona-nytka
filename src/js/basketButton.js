import { refs } from './refs';

if (refs.goToOffersBtn) {
  refs.goToOffersBtn.addEventListener('click', () => {
    localStorage.setItem('scroll', e.target.dataset.section);
    document.location.pathname = '/chervona-nytka/index.html';
  });
}
