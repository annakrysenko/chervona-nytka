import { refs } from './refs';

console.log(refs.goToOffersBtn);
refs.goToOffersBtn.addEventListener('click', e => {
  localStorage.setItem('scroll', e.target.dataset.section);
  document.location.pathname = '/chervona-nytka/index.html';
});
