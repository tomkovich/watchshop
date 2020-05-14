import Glide from "@glidejs/glide";

/* Sliders */

let sliders = [
  {
    selector: "main-carousel"
  },
  {
    selector: "products-slider",
    settings: {
      perView: 3,
      gap: 40,
      breakpoints: {
        1100: {
          perView: 2
        },
        420: {
          perView: 1
        }
      }
    }
  },
  { 
    selector: "product-carousel" 
  }
]

let createSlider = slider => {
  slider = {
    selector: document.getElementById(slider.selector) || "",
    settings: slider.settings || { perView: 1 }
  };

  if (slider.selector !== "") {
    new Glide(slider.selector, slider.settings).mount();
  }
};

for(let i = 0; i < sliders.length; i++) {
  createSlider(sliders[i]);
}


/* Scroll top */
let btnTop = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 715) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
});

if (btnTop) {
  btnTop.addEventListener("click", () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth"
    });
  });
}

/* Adding Info Open */
let addInfoOpen = document.querySelector(".product-features ul li:last-child");
let addInfoBlock;

if (addInfoOpen) {
  addInfoBlock = addInfoOpen.querySelector(".product-features_adding__info");
}

if (addInfoBlock) {
  addInfoOpen.style.cursor = "pointer";
  addInfoOpen.addEventListener("click", () => {
    addInfoBlock.classList.toggle("active");
  });
}

/* Open Mobile Menu */
let hamburger = document.querySelector('.hamburger');
let mobileMenu = document.querySelector('.header-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('mobile-menu');
  hamburger.classList.toggle('active');
});

console.log("https://vk.com/tomkovich_ya");
