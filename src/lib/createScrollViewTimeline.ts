export function createScrollViewTimeline(options: ScrollViewTimelineOptions) {
  console.log('defineEnterAnimation', options);
  const { subject, onScroll, onEnd } = options;

  let pos: ReturnType<typeof calculatePos>;
  let observing = false;

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !observing) {
      startScrollObserve(entry.boundingClientRect);
    } else {
      stopScrollObserve();
    }
  });

  function startScrollObserve(rect = subject.getBoundingClientRect()) {
    observing = true;
    pos = calculatePos(rect);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  function stopScrollObserve() {
    observing = false;
    console.log('stop');
    window.removeEventListener('scroll', handleScroll);
  }

  function handleScroll() {
    const scrollTop = document.documentElement.scrollTop;

    const { scrollBegin, scrollEnd } = pos;

    const percent = Math.max(Math.min((scrollTop - scrollBegin) / (scrollEnd - scrollBegin), 1), 0);

    onScroll?.(percent);

    if (percent >= 1) {
      onEnd?.();
      // stopScrollObserve();
    }
  }

  function pause() {
    stopScrollObserve();
    io.unobserve(subject);
  }

  function resume() {
    io.observe(subject);
  }

  resume();

  return {
    pause,
    resume,
  };
}

export function calculatePos(rect: DOMRect) {
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  const top = scrollTop + rect.top;

  const scrollBegin = top - clientHeight;
  const scrollEnd = scrollBegin + rect.height;

  return { top, scrollBegin, scrollEnd };
}

export interface ScrollViewTimelineOptions {
  subject: HTMLElement;
  onScroll?: (percent: number) => void;
  onEnd?: () => void;
}
