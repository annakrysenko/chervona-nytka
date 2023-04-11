export const refs = {
  // header
  openMenuBtn: document.querySelector('.burger-menu-open'),
  closeMenuBtn: document.querySelector('.burger-menu'),
  headerMenu: document.querySelector('.header-menu'),
  nav: document.querySelector('.nav-list'),
  navAll: document.querySelectorAll('.nav-text'),
  basketBtn: document.querySelector('#basket'),
  burgerEl: document.querySelector('#burger'),
  // for navigation
  allOffersSection: document.querySelector('#offers'),
  advantagesSection: document.querySelector('#advantages'),
  reviewsSection: document.querySelector('#reviews'),
  footerSection: document.querySelector('#footer'),

  allOffersBtn: document.querySelector('[data-section="allOffersSection"]'),
  advantagesBtn: document.querySelector('[data-section="advantagesSection"]'),
  reviewsBtn: document.querySelector('[data-section="reviewsSection"]'),
  footerBtn: document.querySelector('[data-section="footerSection"]'),
  // reviews
  slider: document.querySelector('.swiper-wrapper'),
  // allOffers
  offersList: document.querySelector('.offers-list'),
  // basket
  basketListEl: document.querySelector('.basket-list'),
  // special
  specials: document.querySelector('.js-special'),
};
