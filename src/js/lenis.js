export const lenis = new Lenis({
  duration: 1.5,
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
  mouseMultiplier: 1,
  infinite: false,
});

let earlyRAF;
(function startEarlyLoop() {
  const loop = t => {
    lenis.raf(t);
    earlyRAF = requestAnimationFrame(loop);
  };
  earlyRAF = requestAnimationFrame(loop);
})();

function handoffToGSAP() {
  if (earlyRAF) {
    cancelAnimationFrame(earlyRAF);
    earlyRAF = null;
  }

  gsap.ticker.add(() => {
    lenis.raf(gsap.ticker.time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  lenis.on('scroll', ScrollTrigger.update);

  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,resize',
  });

  if (document.readyState !== 'loading') {
    ScrollTrigger.refresh();
  } else {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        ScrollTrigger.refresh();
      },
      { once: true }
    );
  }
}

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  handoffToGSAP();
} else {
  const wait = () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      handoffToGSAP();
    } else {
      requestAnimationFrame(wait);
    }
  };
  requestAnimationFrame(wait);
}
