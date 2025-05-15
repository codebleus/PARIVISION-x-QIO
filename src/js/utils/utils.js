export const randomNumber = () => {
  Math.floor(Math.random() * (max - min + 1)) + min;
};

export const initVideos = () => {
  const btns = gsap.utils.toArray('[data-play-btn]');
  const videos = gsap.utils.toArray('[data-video]');

  if (videos.length) {
    videos.forEach(video => {
      video.addEventListener('ended', function () {
        video.parentElement.classList.remove('_is-playing');
      });
      video.parentElement.addEventListener('click', function (e) {
        if (!video.paused && !e.target.closest('[data-play-btn]')) {
          video.pause();
          video.closest('._is-playing').classList.remove('_is-playing');
        }
      });
    });
  }

  if (btns.length) {
    btns.forEach(btn => {
      btn.addEventListener('click', function () {
        const video = btn.parentElement.querySelector('video');

        if (video) {
          video.play();
          btn.parentElement.classList.add('_is-playing');
        }
      });
    });
  }
};

export const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

export const initWatchTimer = () => {
  if (document.querySelectorAll('[data-cur-time]').length) {
    document.querySelectorAll('[data-cur-time]').forEach(el => {
      const init = () => {
        const today = new Date();
        let hr = today.getHours();
        let min = today.getMinutes();
        let sec = today.getSeconds();

        if (hr < 10) {
          hr = '0' + hr;
        }
        if (min < 10) {
          min = '0' + min;
        }
        if (sec < 10) {
          sec = '0' + sec;
        }

        el.innerHTML = `${hr + ':'}${min + ':'}${sec}`;
      };

      setInterval(init, 500);
    });
  }
};

export const shuffle = array => {
  return Array(array.length)
    .fill(null)
    .map((_, i) => [Math.random(), i])
    .sort(([a], [b]) => a - b)
    .map(([, i]) => array[i]);
};

export const getOffset = element => {
  if (!element.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  let rect = element.getBoundingClientRect();
  let win = element.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset,
  };
};

export const removeClasses = (items, className) => {
  if (items.length) {
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      element.classList.remove(className);
    }
  }
};

export const dynamicDOM = () => {
  const sortByNumber = (a, b) => a.targetIdx - b.targetIdx;

  const elementsData = [];

  // create
  const mm = gsap.matchMedia();

  if (document.querySelectorAll('[data-dd]').length) {
    document.querySelectorAll('[data-dd]').forEach((element, idx) => {
      const parent = element.parentElement;
      const dataset = element.dataset.dd.trim().split(',');
      const data = {
        element,
        parent,
        target: document.querySelector(dataset[0]),
        targetIdx: +dataset[1],
        parentIdx: Array(parent.childNodes).indexOf(element),
      };
      elementsData.push(data);
    });
  }

  // add a media query. When it matches, the associated function will run
  mm.add('(max-width: 49em)', () => {
    // this setup code only runs when viewport is at least 800px wide

    elementsData.forEach(el => {
      const { element, target, targetIdx } = el;

      target.insertBefore(element, target.childNodes[targetIdx + 1]);
    });

    return () => {
      // optional
      // custom cleanup code here (runs when it STOPS matching)
      elementsData.forEach(el => {
        const { parent, element, parentIdx } = el;

        parent.insertBefore(element, parent.childNodes[parentIdx + 1]);
      });
    };
  });

  elementsData.sort(sortByNumber);
};

export const remToPx = rem => {
  const baseFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  const px = rem * baseFontSize;

  return px;
};
