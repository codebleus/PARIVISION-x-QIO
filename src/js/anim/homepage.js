import { isTouch } from '../utils/script';
import { removeClasses } from '../utils/utils';

export const list = document.querySelector('.homepage-table__list');
export const headings = gsap.utils.toArray('.leaders__group-heading');

export const initLeadersScreenObserver = (self, leaders, leadersIdx) => {
  const deltaY = isTouch ? self.deltaY * -1 : self.deltaY;

  self.disable();
  document.documentElement.classList.add('_is-animating');

  leaders[leadersIdx] && leaders[leadersIdx].classList.add('_is-visible');
  if (headings[leadersIdx]) {
    removeClasses(headings, '_is-active');
    headings[leadersIdx].classList.add('_is-active');
  }

  if (deltaY < 0) {
    leaders[leadersIdx + 1] &&
      leaders[leadersIdx + 1].classList.remove('_is-visible');
  } else if (window.innerWidth <= 1024) {
    document
      .querySelector('.leaders__group_center')
      .classList.remove('_is-visible');
  }

  setTimeout(() => {
    self.enable();
    document.documentElement.classList.remove('_is-animating');
  }, 1000);
};

export const itemsTl = gsap
  .timeline({ paused: true })
  .to('.homepage-table__list-item', {
    '--mb': '2rem',
    '--opacity': 1,
    '--scale': 1,
    duration: 0.5,
    stagger: -0.3,
  });

export const initItemsAnim = () => {
  if (list) {
    list.addEventListener('click', function () {
      if (isTouch) {
        list.classList.toggle('_is-active');

        if (!list.classList.contains('_is-active')) {
          itemsTl.reverse();
        } else {
          itemsTl.play();
        }
      }
    });

    list.addEventListener('mouseover', function () {
      if (!isTouch) itemsTl.play();
    });
    list.addEventListener('mouseout', function () {
      if (!isTouch) itemsTl.reverse();
    });
  }
};
