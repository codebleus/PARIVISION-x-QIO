import { removeClasses, remToPx } from '../utils/utils';
import { mm } from '../utils/script';

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
          if (document.querySelector('.gallery__slide-btn_prev')) {
            document
              .querySelector('.gallery__slide-btn_prev')
              .addEventListener('click', () => {
                swiper.slidePrev();
              });
          }
          if (document.querySelector('.gallery__slide-btn_next')) {
            document
              .querySelector('.gallery__slide-btn_next')
              .addEventListener('click', () => {
                swiper.slideNext();
              });
          }
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
