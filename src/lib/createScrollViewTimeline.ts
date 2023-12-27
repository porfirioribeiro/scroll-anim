import { CSSRangeType, CSSRangeUnit } from './types';

export function createScrollViewTimeline(options: ScrollViewTimelineOptions) {
  console.log('defineEnterAnimation', options);
  const { subject, rangeStart = 'cover 0%', rangeEnd = 'cover 100%', onScroll, onEnd } = options;

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
    pos = calculatePos(rect, rangeStart, rangeEnd);

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

    const [scrollBegin, scrollEnd] = pos;

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

export interface ScrollViewTimelineOptions {
  subject: HTMLElement;
  rangeStart?: CSSRangeUnit;
  rangeEnd?: CSSRangeUnit;
  onScroll?: (percent: number) => void;
  onEnd?: () => void;
}

function calculatePos(rect: DOMRect, rangeStart: CSSRangeUnit, rangeEnd: CSSRangeUnit) {
  const [startType, startPercent] = parseRange(rangeStart);
  const [endType, endPercent] = parseRange(rangeEnd);

  console.log('calculatePos', startType, startPercent, endType, endPercent);

  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  const top = scrollTop + rect.top;

  const scrollBegin = top - clientHeight;
  const scrollEnd = scrollBegin + rect.height;

  return [scrollBegin, scrollEnd];
}

type ParsedRange = [type: CSSRangeType, percent: number];

function parseRange(range: CSSRangeUnit): ParsedRange {
  const [type, percent] = range.split(' ');
  return [type as CSSRangeType, parseFloat(percent) / 100];
}
