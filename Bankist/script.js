'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//Looping over buttons of btns open modal with foreach loop
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
//Looping over buttons of btns open modal with normal for loop
/*
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);
  */

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.documentElement); //used to select all the elements of document
console.log(document.head);
console.log(document.body);

let header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1'); //section1 is the id
const allBUttons = document.getElementsByTagName('.button');
console.log(allBUttons);

// Changing Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
//Non Standard attribute
console.log(logo.designer); //it will give undefined as designer is not a standard attribute of img tag
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

const link = document.querySelector('.nav__link--btn');

//console.log(link.href); //shows relative link
//console.log(link.getAttribute('href')); //shows absolute link

//Data attributes:
//console.log(logo.dataset.versionNumber);

//Smooth Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  //const s1coords = section1.getBoundingClientRect();
  //console.log(s1coords);

  //console.log(e.target.getBoundingClientRect());
  //console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  //console.log(
  //'height/widht viewport:',
  //document.documentElement.clientHeight,
  //document.documentElement.clientWidth
  //);
  //Scrolling: Using co-ordinates
  /*
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    right: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
*/
  section1.scrollIntoView({ behavior: 'smooth' });
});

/*

//Page Navigation
//This method is not efficent as forEach() creates new instance for every link inside the nav
//To deal with tha we need to use Event Delegation
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

*/

//Event Delgation for scrolling
//1.Add event listener to common parent element
//2.Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); //this will prevent the redirecting to the respective id
  //console.log(e.target);
  //Matching startegy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  //Removing classess and then adding them
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Nav fade animation
const nav = document.querySelector('.nav');
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(sib => {
      if (sib !== link) sib.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//Sticky Navigation instead of header try section1
const initalCoords = header.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (this.window.scrollY > initalCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

//Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');
const loading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

//Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const maxslide = slides.length - 1;

let curSlide = 0;
//const slider = document.querySelector('.slider');
//slider.style.transform = 'scale(0.4) translateX(-800px)';
//slider.style.overflow = 'visible';

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxslide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxslide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

/*
//Event Bubbling

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV_LINK', e.target, e.currentTarget);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV_LINK', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV_LINK', e.target, e.currentTarget);
});
*/

//DOM traversing ----------------------------------------
/*const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = ' #ff5500';

//Going upwards:parents
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.backgroundColor = 'var(--gradient-secondary)';*/

//Classes
//logo.classList.add('c', 'h');
//logo.classList.remove('c');
//logo.classList.toggle('c');
//logo.classList.contains('c');

//creating and inserting elements
//const message = document.createElement('div');
//message.classList.add('cookie-message');
//message.innerHTML =
//  'We use cookie for improved functionality and andalytics.<button class="btn btn--close-cookie">Got it!</button>';
//header.append(message);
//Deleting Element
//document
//  .querySelector('.btn--close-cookie')
//.addEventListener('click', () => message.remove());

//Styles

/*
this styles goes as inline styling 
you can not access the styling inside the css file 
*/

//message.style.backgroundColor = '#37382d';
//message.style.width = '120%';
//console.log(message.style.color);
//console.log(message.style.backgroundColor);

/*
to access css file stling we nee getComputedStyle()
*/
//console.log(getComputedStyle(message).color);
//console.log(getComputedStyle(message).height);

//message.style.height =
//  Number.parseInt(getComputedStyle(message).height, 10) + 30 + 'px';
//Changing CSS variables:
//document.documentElement.style.setProperty('--color-primary', 'orangered');
