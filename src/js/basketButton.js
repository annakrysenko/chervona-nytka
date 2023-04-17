import { refs } from './refs';

refs.goToOffersBtn.addEventListener('click', e => {
  console.log(first);
  localStorage.setItem('scroll', e.target.dataset.section);
  document.location.pathname = '/chervona-nytka/index.html';
});
