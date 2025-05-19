import { removeClasses, remToPx } from '../utils/utils';
import { md, mm } from '../utils/script';

window.addEventListener('load', function () {
  if (document.querySelector('.news__slider')) {
    mm.add('(min-width: 64em)', () => {
      const slider = new Swiper('.news__slider', {
        slidesPerView: 'auto',
        loop: true,
        spaceBetween: remToPx(7.1),
        navigation: {
          prevEl: '.news__controls .controls__btn_prev',
          nextEl: '.news__controls .controls__btn_next',
        },
        pagination: {
          el: '.news__controls .controls__fraction',
          type: 'custom',
          renderCustom(swiper, current, total) {
            return current + '//' + total;
          },
        },
        on: {
          sliderMove: () => {
            document.documentElement.classList.add('_slide-move');
          },
          touchEnd: () => {
            setTimeout(() => {
              document.documentElement.classList.remove('_slide-move');
            }, 1000);
          },
        },
      });

      return () => {
        slider.destroy();
      };
    });
  }
  if (document.querySelector('.gallery__slider')) {
    const thumbs = gsap.utils.toArray('.gallery__thumb');
    new Swiper('.gallery__slider', {
      slidesPerView: 'auto',
      loop: true,
      preventClicks: false,
      preventClicksPropagation: false,
      passiveListeners: false,
      navigation: {
        prevEl: '.gallery .gallery__controls-btn_prev',
        nextEl: '.gallery .gallery__controls-btn_next',
      },
      on: {
        init: swiper => {
          if (thumbs.length) {
            thumbs[0].classList.add('_is-active');

            thumbs.forEach((thumb, idx) => {
              thumb.addEventListener('click', function () {
                removeClasses(thumbs, '_is-active');
                thumb.classList.add('_is-active');

                swiper.slideTo(idx);
              });
            });
          }
          swiper.el.addEventListener('click', function (e) {
            const cnt = document.querySelector('.gallery__container');
            const cntw = document.querySelector(
              '.gallery__container'
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
        slideChange: swiper => {
          if (thumbs.length && thumbs[swiper.realIndex]) {
            removeClasses(thumbs, '_is-active');
            thumbs[swiper.realIndex].classList.add('_is-active');
          }
        },
      },
    });
  }
  if (document.querySelector('.other__slider')) {
    mm.add('(min-width: 64em)', () => {
      const slider = new Swiper('.other__slider', {
        slidesPerView: 3,
        spaceBetween: remToPx(8.8),
        loop: true,
        navigation: {
          prevEl: '.other .other__controls-btn_prev',
          nextEl: '.other .other__controls-btn_next',
        },
      });

      return () => {
        slider.destroy();
      };
    });
  }
});
