// varibles para modal
const cerrar = document.querySelector(".close");
const abrir = document.querySelector(".cta");
const modal = document.querySelector(".modal");
const modalC = document.querySelector(".modal-container");

window.addEventListener("load", function () {
  new Glider(document.querySelector(".carousel__lista"), {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    dots: ".carousel__indicadores",
    arrows: {
      prev: ".carousel__anterior",
      next: ".carousel__siguiente",
    },
    responsive: [
      {
        // screens greater than >= 775px
        breakpoint: 450,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        // screens greater than >= 1024px
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  });
});

abrir.addEventListener("click", function (e) {
  e.preventDefault();
  modalC.style.opacity = "1";
  modalC.style.visibility = "visible";
  modal.classList.toggle("modal-close");
});

cerrar.addEventListener("click", function (e) {
  modal.classList.toggle("modal-close");
  setTimeout(() => {
    modalC.style.opacity = "0";
    modalC.style.visibility = "hidden";
  }, 850);
});

window.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target == modalC) {
    modal.classList.toggle("modal-close");
    setTimeout(() => {
      modalC.style.opacity = "0";
      modalC.style.visibility = "hidden";
    }, 800);
  }
});

window.addEventListener(
  "DOMContentLoaded",
  function (e) {
    const links = document.getElementsByTagName("A");
    for (let i = 0; i < links.length; i++) {
      if (!links[i].hash) continue;
      if (links[i].origin + links[i].pathname != self.location.href) continue;
      (function (anchorPoint) {
        links[i].addEventListener(
          "click",
          function (e) {
            anchorPoint.scrollIntoView(true);
            e.preventDefault();
          },
          false
        );
      })(document.getElementById(links[i].hash.replace(/#/, "")));
    }
  },
  false
);

