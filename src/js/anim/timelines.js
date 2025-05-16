import { openModal } from '../utils/modals';
import { initItemsAnim, itemsTl } from './homepage';
import {
  getCurSection,
  ACTIVE_CLASS,
  ANIMATING_CLASS,
  INIT_SCROLL_CLASS,
  initHomepageScroll,
  observer,
  resetActiveSection,
  sections,
  leaders,
} from './homepage-scroll';

export const duration = 1.5;

export const video1 = document.getElementById('homepage-video-1');
export const player1 = video1 ? video1.querySelector('video') : null;
const sectionMain = document.querySelector('[data-section="main"]');
const sectionAbout = document.querySelector('[data-section="about"]');
const sectionTeam = document.querySelector('[data-section="team"]');
const sectionLeaders = document.querySelector('[data-section="leaders"]');
const sectionTeams = document.querySelector('[data-section="teams"]');
const sectionNews = document.querySelector('[data-section="news"]');
const sectionContacts = document.querySelector('[data-section="contacts"]');
const sectionLinks = document.querySelector('[data-section="links"]');

const hideLoader = () => {
  setTimeout(() => {
    document.querySelectorAll('.preloader__progress') &&
      document.querySelectorAll('.preloader__progress').forEach(el => {
        el.textContent = 100;
      });
    tlPreloaderLeave.play();
  }, 2000);
};

if (document.querySelector('._page-loaded')) {
  hideLoader();
} else {
  window.addEventListener('load', hideLoader);
}

const clearedProps = {
  opacity: 1,
  translateY: 0,
  filter: 'blur(0rem)',
};
const blurTopProps = {
  opacity: 0,
  filter: 'blur(1rem)',
  translateY: '-10%',
};
const opacityTopProps = {
  opacity: 0,
  translateY: '-100%',
};

const onDefaults = {
  defaults: {
    duration: 1,
    ease: 'circ.inOut',
  },
  paused: true,
  onComplete: () => {
    document.documentElement.classList.remove(ANIMATING_CLASS);
    observer.enable();
  },
};
const offDefaults = {
  defaults: onDefaults.defaults,
  paused: true,
  onStart: () => {
    document.documentElement.classList.add(ANIMATING_CLASS);
    observer.disable();
  },
};

export const tlPreloader = gsap.timeline({
  paused: true,
  defaults: onDefaults.defaults,
});
export const tlPreloaderLeave = gsap.timeline({
  ...offDefaults,
});

tlPreloaderLeave.to('.preloader__video, #loader', {
  opacity: 0,
  duration: 0.5,
  onStart: () => {
    gsap.to('.homepage-table, .header', { opacity: 1 });
    gsap.to('.homepage-table, .header', {
      filter: 'blur(0rem)',
      delay: 0.5,
    });
    gsap.to('.header__heading', { opacity: 1 });

    if (document.querySelector('[data-section]')) {
      document.querySelector('[data-section]').classList.add(ACTIVE_CLASS);
      resetActiveSection(document.querySelector('[data-section]'));
    }

    tlMain.play();
  },
  onComplete: () => {
    document.getElementById('loader').remove();
    if (document.querySelector('.schedule')) {
      setTimeout(() => {
        openModal('pariPromoModal');
      }, 5000);
    }
  },
});

export const tlMain = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionMain)}-on`,
});
export const tlMainLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionMain)}-off`,
});

export const tlAbout = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionAbout)}-on`,
});
export const tlAboutLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionAbout)}-off`,
});

export const tlTeam = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionTeam)}-on`,
});
export const tlTeamLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionTeam)}-off`,
});

export const tlLeaders = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionLeaders)}-on`,
});
export const tlLeadersLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionLeaders)}-off`,
});

export const tlTeams = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionTeams)}-on`,
});
export const tlTeamsLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionTeams)}-off`,
});

export const tlNews = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionNews)}-on`,
});
export const tlNewsLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionNews)}-off`,
  onStart: function () {
    if (
      document.querySelector('[data-current-section="links"]') &&
      window.innerWidth <= 1024
    ) {
      this.getChildren()[0].vars = {};
    }
  },
});

export const tlContacts = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionContacts)}-on`,
});
export const tlContactsLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionContacts)}-off`,
});

export const tlLinks = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionLinks)}-on`,
});
export const tlLinksLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionLinks)}-off`,
});

if (document.querySelector('.set-homepage-css')) {
  const table = document.querySelector('.homepage-table');

  tlMain
    .to('.hero__container', {
      ...clearedProps,
      onStart: () => {
        gsap.timeline().to(video1, { opacity: 0 });
        gsap.to('.header__lang', { autoAlpha: 1 });
      },
      onComplete: () => {
        if (!document.querySelector(`.${INIT_SCROLL_CLASS}`)) {
          initHomepageScroll();
          itemsTl.play();
          itemsTl.then(() => {
            setTimeout(() => {
              itemsTl.reverse();
              itemsTl.then(initItemsAnim);
            }, 700);
          });
        }
      },
    })
    .to('html', { '--opacity': 1 }, 0)
    .to('body', { '--opacity': 1 }, 0);
  tlMainLeave
    .to('.hero__container', {
      ...blurTopProps,
      onComplete: () => {
        gsap.to('.header__lang', { autoAlpha: 0 });
      },
    })
    .to('body', { '--opacity': 0 }, 0);
  tlAbout
    .to('.about__heading-txt:first-child, .about__heading-txt:nth-child(2)', {
      duration: 1,
      opacity: 1,
      translateY: 0,
      onStart: () => {
        gsap.timeline().to(
          video1,
          {
            opacity: 1,
          },
          0.7
        );
      },
    })
    .to(
      '.about__heading-txt:first-child, .about__heading-txt:nth-child(2)',
      {
        filter: 'blur(0rem)',
        duration: 1,
      },
      0.5
    )
    .to(
      '.about__text-wrap',
      clearedProps,

      0
    )
    .to(
      '.about__heading-txt:nth-child(3), .about__heading-txt:nth-child(4)',
      {
        duration: 1,
        opacity: 1,
        translateY: 0,
        stagger: 0.1,
      },
      0.5
    )
    .to(
      '.about__heading-txt:nth-child(3), .about__heading-txt:nth-child(4)',
      {
        filter: 'blur(0rem)',
        duration: 1,
        stagger: 0.2,
      },
      1
    )

    .to(
      'body',
      {
        '--opacity': 0,
      },
      0.7
    );
  tlAboutLeave.to('.about__heading, .about__text-wrap', {
    ...blurTopProps,
    onStart: () => {
      if (player1 && getCurSection()) {
        if (getCurSection() === 'team') {
          player1.play();
        } else {
          gsap.to(video1, { opacity: 0 });
        }
      }
    },
  });
  tlTeam
    .to('.team__heading span', {
      opacity: 1,
      translateY: 0,
      duration: 1,
      stagger: 0.1,
      onStart: () => {
        if (player1 && player1.currentTime !== player1.duration) {
          player1.play();
        }

        gsap.timeline().to(video1, { opacity: 1 }, 0);

        table && table.removeAttribute('data-table-section');
      },
    })
    .to(
      '.team__heading span',
      { filter: 'blur(0rem)', stagger: 0.1, duration: 1 },
      0.3
    )
    .to('.team__txt', clearedProps, 0);
  tlTeamLeave.to('.team__heading span', blurTopProps).to(
    '.team__txt',
    {
      ...opacityTopProps,
      onStart: () => {
        gsap.to('#homepage-video-1', {
          opacity: 0,
          onComplete: () => {
            if (player1) {
              player1.currentTime = 0;
              player1.pause();
            }
          },
        });
        if (getCurSection() && getCurSection() === 'about') {
          gsap.to('#homepage-video-1', { opacity: 1, delay: 1 });
        }
      },
    },
    0
  );
  tlLeaders
    .to('.leaders__container, .leaders__group_center', {
      ...clearedProps,
      onStart: () => {
        const cnd =
          window.innerWidth <= 1024 &&
          !leaders[leaders.length - 1].classList.contains('_is-visible');

        document.documentElement.classList.add('leaders-screen');

        gsap.timeline().to(video1, { opacity: 0 }, 0);

        if (cnd) {
          document
            .querySelector('.leaders__group_center')
            .classList.add('_is-visible');
        }

        table && (table.dataset.tableSection = 'leaders');

        setTimeout(() => {
          if (cnd || !document.querySelector('.leaders__group._is-visible')) {
            document
              .querySelector('.leaders__group-heading_main')
              .classList.add('_is-active');
          }
        }, 1000);
      },
    })
    .to('html, .leaders', { '--opacity': 1 }, 0);
  tlLeadersLeave
    .to('.leaders__container', {
      opacity: 0,
    })
    .to('.leaders', { '--opacity': 0 }, 0);
  tlTeams
    .to('.teams', { '--opacity': 1 })
    .to(
      '.item-teams',
      {
        '--opacity': 1,
        visibility: 'visible',
        stagger: 0.3,
        onStart: () => {
          table && (table.dataset.tableSection = 'teams');
        },
      },
      0
    )
    .to(
      '.item-teams',
      {
        '--blur': '0rem',
        duration: 1,
        stagger: 0.3,
      },
      0
    )
    .to(
      '.item-teams__logo',
      {
        scaleY: 1,
        stagger: 0.3,
      },
      0
    );
  tlTeamsLeave
    .to('.teams', {
      '--opacity': 0,
    })
    .to(
      '.item-teams',
      {
        '--skew1': '-10deg',
        '--skew2': '10deg',
        stagger: 0.3,
        ...blurTopProps,
      },
      0
    )
    .to('.item-teams__logo', { scaleY: 0.7, stagger: 0.3 }, 0);
  tlNews.to(
    '.news',
    {
      '--blur': '0rem',
      '--y': 0,
      '--opacity': 1,
      onStart: () => {
        gsap.to('.news__slider', {
          opacity: 1,
          visibility: 'visible',
        });
        table && (table.dataset.tableSection = 'news');
      },
    },
    0
  );

  tlNewsLeave.to(
    '.news',
    {
      '--blur': '3rem',
      '--y': '-50%',
      '--opacity': 0,
      onStart: () => {
        gsap.to('.news__slider', {
          opacity: 0,
          visibility: 'hidden',
        });
      },
    },
    0
  );

  tlContacts.to('.contacts__container', {
    ...clearedProps,
    onStart: () => {
      table && (table.dataset.tableSection = 'contacts');
    },
  });
  tlContactsLeave.to('.contacts__container', {
    ...blurTopProps,
  });
  tlLinks.to('.links__container', {
    ...clearedProps,
  });
  tlLinksLeave.to('.links__container', {
    ...blurTopProps,
  });
}

export const timelines = [
  tlMain,
  tlMainLeave,
  tlAbout,
  tlAboutLeave,
  tlTeam,
  tlTeamLeave,
  tlLeaders,
  tlLeadersLeave,
  tlTeams,
  tlTeamsLeave,
  tlNews,
  tlNewsLeave,
  tlContacts,
  tlContactsLeave,
  tlLinks,
  tlLinksLeave,
];
