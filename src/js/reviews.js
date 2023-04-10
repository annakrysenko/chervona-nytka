import Swiper, { Navigation, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import { refs } from './refs';
import { data } from './reviews-data';

export const swiper = new Swiper('.swiper', {
  modules: [Navigation, Autoplay],
  autoplay: {
    enabled: true,
    delay: 3500,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    376: {
      slidesPerView: 1,
    },
    834: {
      slidesPerView: 2,
      spaceBetween: 2,
    },
    1440: {
      slidesPerView: 3,
    },
  },
});

const renderMarkupSlider = () => {
  const markup = data
    .map(({ text, auctor }) => {
      return `<li class="swiper-slide">
         <div class="swiper-backdrop">
         <p>${text}</p>
         <p>${auctor}</p>
         </div>
      </li>`;
    })
    .join('');
  if (refs.slider) refs.slider.insertAdjacentHTML('beforeend', markup);
};

renderMarkupSlider();
