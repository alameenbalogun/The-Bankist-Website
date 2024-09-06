"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tab = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector("nav");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

btnsOpenModal.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    openModal();
  })
);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////
///implementing smooth button scrolling
btnScrollTo.addEventListener("click", function () {
  const sicoord = section1.getBoundingClientRect();
  // console.log(sicoord);

  // ///current scroll
  // console.log("CurrentScroll", window.pageXOffset, window.pageYOffset);

  //scrolling
  // window.scrollTo(
  //   sicoord.left + window.pageXOffset,
  //   sicoord.top + window.pageYOffset
  // );

  //smoother scrolling
  // window.scrollTo({
  //   left: sicoord.left + window.pageXOffset,
  //   top: sicoord.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  //newer way to scroll
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////////
//page naigation

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault()

//     const id = this.getAttribute('href')
//     console.log(id)

//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//     // console.log('Links');
//   })
// })

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // console.log("click");
  // console.log(e.target);

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    // console.log(id)

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//tabbed component
tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  ///Guard
  if (!clicked) return;

  ///removes the active button elapses
  tab.forEach((btn) => btn.classList.remove("operations__tab--active"));

  ///adds the button elapses
  clicked.classList.add("operations__tab--active");

  // console.log(`operations__tab--${clicked.dataset.tab}`)

  //removes the active content
  tabContent.forEach((el) =>
    el.classList.remove("operations__content--active")
  );

  ///active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

/////menu fades animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });

    logo.style.opacity = opacity;
  }
};

nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

/////implementing sticky navigation
// const sicoord = section1.getBoundingClientRect();

// window.addEventListener("scroll", function () {
//   // console.log(window.scrollY)
//   // console.log(sicoord.y)

//   if (window.scrollY > sicoord.y) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

///////sticky intersection observer API
const obsCallBack = function (entries, observer) {
  console.log(entries);
  entries.forEach((entry) => {
    console.log(entry);
  });
};

// const obsOptions = {
//   root: null,
//   threshold: 0.2,
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
// console.log(headerHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (entry.isIntersecting) {
    nav.classList.remove("sticky");
  } else {
    nav.classList.add("sticky");
  }

  headerObserver.unobserve(header);
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////section fades in
const sectionFades = document.querySelectorAll(".section");
// console.log(sectionFades);

const releaseSection = function (entries, observer) {
  const [entry] = entries;

  // console.log(entry.target);
  // entry.target.classList.remove("section--hidden");

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(releaseSection, {
  root: null,
  threshold: 0.15,
});

sectionFades.forEach(function (section) {
  sectionObserver.observe(section);
  // console.log(section)
  section.classList.add("section--hidden");
});

/////Lazy Image Loading
const imgTarget = document.querySelectorAll("img[data-src]");

const lazyImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  //replace src with data-src
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0,
});
imgTarget.forEach((img) => imgObserver.observe(img));

///////sliding effect
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
// slider.style.transform = "scale(0.5)";
// slider.style.overflow = "visible";

const slides = document.querySelectorAll(".slide");
// slides.forEach(function (slide, i) {
//   slide.style.transform = `translateX(${100 * i}%)`;
// });
let curSlide = 0;

const slideRoll = function (roll) {
  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${100 * (i - roll)}%)`;
  });
};
slideRoll(curSlide);

const maxSlide = slides.length;

//next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slideRoll(curSlide);
  activateDot(curSlide);
};

//previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  // console.log(curSlide);
  slideRoll(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.documentElement.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "ArrowLeft") prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

const dotContainer = document.querySelector(".dots");

const createDot = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class= "dots__dot" data-slide=${i}></button>`
    );
  });
};
createDot();

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    slideRoll(slide);
    activateDot(slide);
  }
});

const activateDot = function (slide) {
  document.querySelectorAll(".dots__dot").forEach(function (dot, i) {
    dot.classList.remove("dots__dot--active");
  });

  document
    .querySelector(`.dots__dot[data-slide = "${slide}"]`)
    .classList.add("dots__dot--active");
};
activateDot(0);

/*
/////SELECTING ELEMENTS
//seleccts entire document
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSelection = document.querySelectorAll(".section");
console.log(allSelection);

////getting elements by id
document.getElementById("section--1");

const allTags = document.getElementsByTagName("button");
console.log(allTags);

///////CREATING AND INSERTING ELEMENTS
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = 'We use ccokies for improved functionalities and analytics';
message.innerHTML =
  'We use ccokies for improved functionalities and analytics. <buttton class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message)///adds to the first
header.append(message); ///adds to the last

// header.prepend(message)
// header.append(message.cloneNode(true)) //clones the default message and allows access inserting them

// header.before(message)
// header.after(message)

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.remove();
    ///old form of doing it
    message.parentElement.removeChild(message);
  });

message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.backgroundColor);

///was manually typed, which makes this not work
console.log(message.style.color);
//can be called using
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

document.documentElement.style.setProperty("--color-primary", "orangered");

const logo = document.querySelector('.nav__logo');
console.log(logo.src)
console.log(logo.alt)
console.log(logo.className)

//non-standard access
*/

////////////EVENT LISTENER
///the mouseover

// const h1 = document.querySelector("h1");

// const alertHi = function () {
//   alert("Event Listener, mouseover clicked :D");

//   //remove an event listener after being caalled
//   h1.removeEventListener("mouseenter", alertHi);
// };

// h1.addEventListener("mouseenter", alertHi);

//also can be listened through
// h1.onmouseenter = function () {
//   alert("onmouseenter, mouseover clicked :D");
// };

//////events bubbling
///rgb(255, 255, 255)

/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
console.log(randomInt(5, 10));

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());
*/

///useful events
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTMl dom tree built", e);
});

window.addEventListener("load", function (e) {
  console.log("Page has fully loaded", e);
});

window.addEventListener("beforeunload", function (e) {
  e.preventDefault;
  console.log(e);
  e.returnValue = "";
});

// const slider = document.querySelector(".slider");
// // slider.style.overflow = "visible";

// slider.style.transform = `scale(0.5)`;

// const slides = document.querySelectorAll(".slide");
// slides.forEach(function (slide, i) {
//   slide.style.transform = `translateX(${100 * i}%)`;
// });

// let curSlide = 0;
// const btnRight = document.querySelector(".slider__btn--right");
// btnRight.addEventListener("click", function () {
//   const maxSlide = slides.length;
//   if (curSlide === maxSlide - 1) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }

//   slides.forEach(function (slide, i) {
//     slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
//   });
// });

// const btnLeft = document.querySelector(".slider__btn--left");
// btnLeft.addEventListener("click", function () {
//   const maxSlide = slides.length;
//   if (curSlide === 0) {
//     curSlide = maxSlide - 1;
//   } else {
//     curSlide--;
//   }

//   slides.forEach(function (slide, i) {
//     slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
//   });
// });
