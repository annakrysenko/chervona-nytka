import { refs } from './refs';
import { scrollTo } from './headerScroll';

if (refs.heroBtn) {
  refs.heroBtn.addEventListener('click', () => {
    scrollTo(refs.allOffersSection.offsetTop);
  });
}
