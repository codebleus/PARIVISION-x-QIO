import { isTouchDevice, removeClasses } from '../utils/utils';
import { timelines, duration } from './timelines';
import { headings, initLeadersScreenObserver, itemsTl } from './homepage';

gsap.registerPlugin(Observer);

const isTouch = isTouchDevice();

export const ANIMATING_CLASS = '_is-animating';
export const ACTIVE_CLASS = '_is-active';
export const INIT_SCROLL_CLASS = '_init-scroll';

export const getCurSection = () => {
  return document.documentElement.dataset.currentSection;
};

let yPos = 0;
let leadersIdx = 0;

export const leaders = gsap.utils.toArray('.leaders__group');
const heading = document.getElementById('section-heading');
export const sections = gsap.utils.toArray('[data-section]');

const shiftBg = (deltaY = true) => {
  yPos = +document.documentElement.dataset.yShift;
  yPos = deltaY ? yPos - 16 : yPos + 16;
  document.documentElement.dataset.yShift = yPos;
  gsap.to('.homepage', { '--y': `${yPos}rem`, duration });
};

const scroll = (self, i, deltaY) => {
  if (
    !document.querySelector(`.${ANIMATING_CLASS}`) &&
    document.querySelector(`.${INIT_SCROLL_CLASS}`)
  ) {
    self.disable();

    if (itemsTl.progress() !== 1) itemsTl.reverse();

    const prev = sections[i - 1];
    const next = sections[i + 1];
    const target = deltaY === 1 ? next : prev;

    document.documentElement.dataset.currentSection = target.dataset.section;

    resetActiveSection(target, deltaY);
  }
};

const down = self => {
  const activeIdx = sections.indexOf(
    document.querySelector(`[data-section].${ACTIVE_CLASS}`)
  );
  const next = sections[activeIdx + 1];

  if (next) {
    if (sections[activeIdx].dataset.section !== 'leaders') {
      scroll(self, activeIdx, 1);
    } else {
      leadersIdx = leaders[leadersIdx + 1] ? leadersIdx + 1 : 0;

      if (
        leadersIdx !== 0 &&
        !headings[headings.length - 1].classList.contains('_is-active') &&
        !document.documentElement.classList.contains('_is-animating')
      ) {
        initLeadersScreenObserver(self, leaders, leadersIdx);
        shiftBg(true);
      } else if (
        headings[headings.length - 1].classList.contains('_is-active')
      ) {
        document.documentElement.classList.remove('leaders-screen');
        scroll(self, activeIdx, 1);
      }
    }
  }
};
const up = self => {
  const activeIdx = sections.indexOf(
    document.querySelector(`[data-section].${ACTIVE_CLASS}`)
  );
  const next = sections[activeIdx - 1];

  if (next) {
    if (
      sections[activeIdx].dataset.section !== 'leaders' ||
      leaders[0].classList.contains('_is-active')
    ) {
      scroll(self, activeIdx, -1);
    } else {
      leadersIdx = headings.indexOf(
        document.querySelector('.leaders__group-heading._is-active')
      );
      leadersIdx -= 1;

      if (
        leadersIdx !== -1 &&
        !document.documentElement.classList.contains('_is-animating')
      ) {
        initLeadersScreenObserver(self, leaders, leadersIdx);
        shiftBg(false);
      } else {
        document.documentElement.classList.remove('leaders-screen');
        scroll(self, activeIdx, -1);
      }
    }
  }
};

const observerCnd = observer => {
  return (
    observer.event.target.closest('.menu') ||
    (isTouch && observer.event.target.closest('.news__filters')) ||
    document.documentElement.classList.contains('_slide-move')
  );
};

export const observer = Observer.create({
  target: '.homepage',
  type: 'wheel,touch',
  wheelSpeed: isTouch ? -1 : 1,
  onUp: self => {
    if (observerCnd(self)) {
      return;
    }

    if (isTouch) {
      down(self);
    } else {
      up(self);
    }
  },
  onDown: self => {
    if (observerCnd(self)) {
      return;
    }

    if (isTouch) {
      up(self);
    } else {
      down(self);
    }
  },
});
observer.disable();

export const resetActiveSection = (
  section,
  deltaY = -1,
  prevIndex = 'unset'
) => {
  const bullets = gsap.utils.toArray('.homepage-table__bullet');

  if (section) {
    const curIdx = sections.indexOf(section);
    const curBullet = bullets[curIdx];
    const prevIdx =
      prevIndex === 'unset'
        ? deltaY === 1
          ? curIdx - 1
          : curIdx + 1
        : prevIndex;

    const transition = prevTl => {
      const tl = timelines.filter(tl => tl.vars.id === `${curIdx}-on`)[0];
      removeClasses(sections, ACTIVE_CLASS);
      sections[curIdx].classList.add(ACTIVE_CLASS);

      if (tl) {
        tl.restart(true);
      }
      prevTl.revert();
    };

    // if (section.dataset.section !== 'leaders') {
    if (prevIdx >= 0 && document.querySelector(`.${INIT_SCROLL_CLASS}`)) {
      const curTl = timelines.filter(tl => tl.vars.id === `${prevIdx}-off`)[0];
      curTl.restart();
      curTl.then(() => {
        transition(curTl);
      });
    }

    document.documentElement.classList.add(ANIMATING_CLASS);

    yPos = deltaY === 1 ? yPos - 16 : yPos + 16;

    gsap.to('.homepage', { '--y': `${yPos}rem`, duration });
    document.documentElement.dataset.yShift = yPos;

    if (bullets.length && curBullet) {
      removeClasses(bullets, ACTIVE_CLASS);
      curBullet.classList.add(ACTIVE_CLASS);
    }

    if (heading) {
      heading.innerHTML = section.dataset.section;
    }
  }
};
// };

export const initHomepageScroll = () => {
  document.documentElement.classList.add(INIT_SCROLL_CLASS);

  observer.enable();
};
