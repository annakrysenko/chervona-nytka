import { refs } from './refs';

window.addEventListener('load', () => {
  const toScrollLocal = localStorage.getItem('scroll');
  if (
    (toScrollLocal &&
      document.location.pathname === '/chervona-nytka/index.html') ||
    document.location.pathname === '/'
  ) {
    const elementToScroll = switchForScroll(toScrollLocal);

    scrollTo(elementToScroll.offsetTop);
    localStorage.removeItem('scroll', '');
  }
});

if (refs.nav)
  refs.nav.addEventListener('click', e => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }

    if (document.location.pathname === '/chervona-nytka/basket.html') {
      localStorage.setItem('scroll', e.target.dataset.section);
      document.location.pathname = '/chervona-nytka/index.html';
    }
    if (
      document.location.pathname === '/chervona-nytka/index.html' ||
      document.location.pathname === '/chervona-nytka/'
    ) {
      const elementToScrollIndex = switchForScroll(e.target.dataset.section);
      scrollTo(elementToScrollIndex.offsetTop);
    }
  });

export function scrollTo(el) {
  // console.log('el=====>', el);
  window.scrollTo({
    left: 0,
    top: el - 108,
    behavior: 'smooth',
  });
}

window.addEventListener('scroll', () => {
  if (
    refs.allOffersSection.getBoundingClientRect().top < 138 &&
    refs.allOffersSection.getBoundingClientRect().bottom > 139
  ) {
    refs.allOffersBtn.classList.add('active');
  } else {
    refs.allOffersBtn.classList.remove('active');
  }

  if (
    refs.advantagesSection.getBoundingClientRect().top < 138 &&
    refs.advantagesSection.getBoundingClientRect().bottom > 138
  ) {
    refs.advantagesBtn.classList.add('active');
  } else {
    refs.advantagesBtn.classList.remove('active');
  }

  if (
    refs.reviewsSection.getBoundingClientRect().top < 138 &&
    refs.reviewsSection.getBoundingClientRect().bottom >
      refs.reviewsSection.getBoundingClientRect().height
  ) {
    refs.reviewsBtn.classList.add('active');
  } else {
    refs.reviewsBtn.classList.remove('active');
  }

  if (document.documentElement.getBoundingClientRect().bottom < 800) {
    refs.footerBtn.classList.add('active');
  } else {
    refs.footerBtn.classList.remove('active');
  }
});

function switchForScroll(name) {
  let el;
  if (name === 'allOffersSection') {
    el = refs.allOffersSection;
  } else if (name === 'advantagesSection') {
    el = refs.advantagesSection;
  } else if (name === 'reviewsSection') {
    el = refs.reviewsSection;
  } else if (name === 'footerSection') {
    el = refs.footerSection;
  }
  return el;
}
