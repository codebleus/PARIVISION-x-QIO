import { resetActiveSection, sections } from '../anim/homepage-scroll';
import { player1 } from '../anim/timelines';
import { md, resizeNsScreen } from './script';
import { removeClasses } from './utils';

export const checkScreenSize = () => {
  const x = md.matches ? 2.16744186 : 2;
  const s = 1.78;
  const l = 0.749633968;
  const width = window.innerWidth;
  const height = window.innerHeight;

  resizeNsScreen();

  if (
    (md.matches && height / width <= x) ||
    (!md.matches && width / height >= x)
  ) {
    document.documentElement.classList.add('_hf');
  } else {
    document.documentElement.classList.remove('_hf');
  }

  // if (!md.matches && width / height <= l) {
  //   document.documentElement.classList.add('_l-screen');
  // } else {
  //   document.documentElement.classList.remove('_l-screen');
  // }

  if (width / height >= s && width / height < x) {
    document.documentElement.classList.add('_small-screen');
  } else {
    document.documentElement.classList.remove('_small-screen');
  }
};
export const initHomepageBullets = () => {
  if (sections.length) {
    for (let i = 0; i < sections.length; i++) {
      const bullet = document.createElement('button');

      bullet.setAttribute('type', 'button');
      bullet.classList.add('homepage-table__bullet');
      document.querySelector('.homepage-table__bullets').append(bullet);

      if (i === 0) bullet.classList.add('_is-active');

      bullet.addEventListener('click', function () {
        const bullets = gsap.utils.toArray('.homepage-table__bullet');
        const activeIdx = bullets.indexOf(
          document.querySelector('.homepage-table__bullet._is-active')
        );

        resetActiveSection(sections[i], -1, activeIdx);
        removeClasses(bullets, '_is-active');
        bullet.classList.add('_is-active');

        document.documentElement.dataset.currentSection =
          sections[i].dataset.section;

        if (player1) {
          if (sections[i].dataset.section === 'team') {
            player1.play();
          }
        }
      });
    }
  }
};
