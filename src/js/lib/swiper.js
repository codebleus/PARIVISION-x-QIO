import { removeClasses, remToPx } from "../utils/utils";
import { md, mm } from "../utils/script";

function setVerticalImages(swiperEl) {
  const images = swiperEl.querySelectorAll("img");

  images.forEach(img => {
    if (img.dataset.checked) return;

    if (img.complete) {
      checkOrientation(img);
    } else {
      img.addEventListener("load", () => checkOrientation(img), {
        once: true,
      });
    }
  });
}

function checkOrientation(img) {
  if (img.naturalHeight > img.naturalWidth) {
    img.classList.add("_is-vertical");
  } else {
    img.classList.remove("_is-vertical");
  }

  img.dataset.checked = "true";
}

window.addEventListener("load", function () {
  if (document.querySelector(".news__slider")) {
    mm.add("(min-width: 64em)", () => {
      const slider = new Swiper(".news__slider", {
        slidesPerView: "auto",
        loop: true,
        spaceBetween: remToPx(7.1),
        loop: true,
        navigation: {
          prevEl: ".news__controls .controls__btn_prev",
          nextEl: ".news__controls .controls__btn_next",
        },
        pagination: {
          el: ".news__controls .controls__fraction",
          type: "custom",
          renderCustom(swiper, current, total) {
            return current + "//" + total;
          },
        },
        on: {
          sliderMove: () => {
            document.documentElement.classList.add("_slide-move");
          },
          touchEnd: () => {
            setTimeout(() => {
              document.documentElement.classList.remove("_slide-move");
            }, 1000);
          },
        },
      });

      return () => {
        slider.destroy();
      };
    });
  }
  if (document.querySelector(".gallery__slider")) {
    const thumbs = new Swiper(".gallery__thumbs-wrap.swiper", {
      slidesPerView: "auto",

      watchSlidesProgress: true,
      watchSlidesVisibility: true,

      observer: true,
      observeParents: true,
    });
    setTimeout(() => {
      thumbs.update();
    }, 0);
    const slider = new Swiper(".gallery__slider", {
      slidesPerView: 1,
      rewind: true,
      preventClicks: false,
      preventClicksPropagation: false,
      passiveListeners: false,
      navigation: {
        prevEl: ".gallery .gallery__controls-btn_prev",
        nextEl: ".gallery .gallery__controls-btn_next",
      },
      thumbs: {
        swiper: thumbs,
      },
      on: {
        slideChange(swiper) {
          if (!swiper.thumbs?.swiper) return;

          const thumbsSwiper = swiper.thumbs.swiper;
          const index = swiper.realIndex;

          thumbsSwiper.slideTo(index, 300);
        },
        slideChangeTransitionEnd(swiper) {
          setVerticalImages(swiper.el);
        },
        init: swiper => {
          // if (thumbs.length) {
          //   thumbs[0].classList.add('_is-active');

          //   thumbs.forEach((thumb, idx) => {
          //     thumb.addEventListener('click', function () {
          //       removeClasses(thumbs, '_is-active');
          //       thumb.classList.add('_is-active');

          //       swiper.slideTo(idx);
          //     });
          //   });
          // }
          setVerticalImages(swiper.el);
          swiper.el.addEventListener("click", function (e) {
            const cnt = document.querySelector(".gallery__container");
            const cntw = document.querySelector(
              ".gallery__container",
            ).offsetWidth;
            const bcr = cnt.getBoundingClientRect();
            const pw = md ? cntw / 4 : cntw / 6;
            if (e.clientX <= pw) {
              swiper.slidePrev();
            }
            if (e.clientX >= bcr.right - pw) {
              swiper.slideNext();
            }
          });
          // let coords = [];
          // document.addEventListener('mousedown', e => {
          //   coords = [];
          //   coords.push(e.clientX);
          //   coords.push(e.clientY);
          // });
          // document.addEventListener('mouseup', e => {
          //   if (e.clientX === coords[0] && e.clientY === coords[1]) {
          //     if (e.target.closest('.gallery__slide-btn_prev')) {
          //       swiper.slidePrev();
          //     }
          //     if (e.target.closest('.gallery__slide-btn_next')) {
          //       swiper.slideNext();
          //     }
          //     console.log('log');
          //   } else {
          //   }
          // });
        },
        // slideChange: swiper => {
        //   if (thumbs.length && thumbs[swiper.realIndex]) {
        //     removeClasses(thumbs, '_is-active');
        //     thumbs[swiper.realIndex].classList.add('_is-active');
        //   }
        // },
      },
    });
  }
  if (document.querySelector(".other__slider")) {
    mm.add("(min-width: 64em)", () => {
      const slider = new Swiper(".other__slider", {
        slidesPerView: 3,
        spaceBetween: remToPx(8.8),
        loop: true,
        navigation: {
          prevEl: ".other .other__controls-btn_prev",
          nextEl: ".other .other__controls-btn_next",
        },
      });

      return () => {
        slider.destroy();
      };
    });
  }
});
