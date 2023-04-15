import { refs } from './refs';

if (refs.goToOffersBtn) {
  refs.goToOffersBtn.addEventListener('click', () => {
    localStorage.setItem('scroll', 'allOffersSection');
    document.location.pathname = '/chervona-nytka/index.html';
  });
}
