import { refs } from './refs';

let elementToScroll;
const toScrollLocal = localStorage.getItem('scroll');
if (toScrollLocal) {
  elementToScroll = switchForScroll(toScrollLocal);
  scrollTo(elementToScroll.offsetTop);
  localStorage.clear('scroll', '');
}

if (refs.nav)
  refs.nav.addEventListener('click', e => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }

    if (document.location.pathname === '/basket.html') {
      localStorage.setItem('scroll', e.target.dataset.section);
      document.location.pathname = '/index.html';
    }

    elementToScroll = switchForScroll(e.target.dataset.section);
    scrollTo(elementToScroll.offsetTop);
  });

function scrollTo(el) {
  window.scrollTo({
    left: 0,
    top: el - 108,
    behavior: 'smooth',
  });
}

window.addEventListener('scroll', () => {
  console.log();
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

  if (
    // Math.ceil(refs.footerSection.getBoundingClientRect().top) - 1 ===
    // document.documentElement.offsetHeight - refs.footerSection.offsetHeight
    document.documentElement.getBoundingClientRect().bottom < 800
    // document.documentElement.offsetHeight

    // Math.ceil(refs.reviewsSection.getBoundingClientRect().bottom) ===
    // Math.ceil(refs.footerSection.getBoundingClientRect().top)
  ) {
    console.log('footerSection ===> ', 'footerSection');
    refs.footerBtn.classList.add('active');
  } else {
    refs.footerBtn.classList.remove('active');
  }
});

function switchForScroll(name) {
  let el;
  switch (name) {
    case 'allOffersSection':
      el = refs.allOffersSection;

      break;
    case 'advantagesSection':
      el = refs.advantagesSection;
      break;
    case 'reviewsSection':
      el = refs.reviewsSection;
      break;
    case 'footerSection':
      el = refs.footerSection;
      break;
  }
  return el;
}

// function removeActive() {
//   refs.navAll.forEach(ref => {
//     ref.classList.remove('active');
//   });
// }
