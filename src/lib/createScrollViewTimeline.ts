import { CSSRangeType, CSSRangeUnit } from './types';

export type AnimationState = 'start' | 'running' | 'end';

export function createScrollViewTimeline({
  subject,
  rangeStart = 'cover 0%',
  rangeEnd = 'cover 100%',
  onScroll,
  onEnd,
}: ScrollViewTimelineOptions) {
  let pos: ReturnType<typeof calculatePos>;
  let observing = false;
  let state: AnimationState = 'start';
  let prevValue = -1;

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
    window.removeEventListener('scroll', handleScroll);
  }

  function handleScroll() {
    const scrollTop = document.documentElement.scrollTop;

    const [scrollBegin, scrollEnd] = pos;

    const value = Math.max(Math.min((scrollTop - scrollBegin) / (scrollEnd - scrollBegin), 1), 0);

    if (prevValue === value) return;

    state = value === 0 ? 'start' : value === 1 ? 'end' : 'running';
    prevValue = value;

    onScroll?.(value, prevValue, state);
    if (value >= 1) onEnd?.();
  }

  function pause() {
    stopScrollObserve();
    io.unobserve(subject);
  }

  function play() {
    io.observe(subject);
  }

  function cancel() {
    stopScrollObserve();
    io.disconnect();
  }

  play();

  return { pause, play, cancel };
}

export type ScrollViewTimeline = ReturnType<typeof createScrollViewTimeline>;

export interface ScrollViewTimelineOptions {
  subject: HTMLElement;
  rangeStart?: CSSRangeUnit;
  rangeEnd?: CSSRangeUnit;
  onScroll?(value: number, prevValue: number, state: AnimationState): void;
  onEnd?(): void;
}

function calculatePos(rect: DOMRect, rangeStart: CSSRangeUnit, rangeEnd: CSSRangeUnit) {
  const [startType, startPercent] = parseRange(rangeStart);
  const [endType, endPercent] = parseRange(rangeEnd);

  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  const top = scrollTop + rect.top;
  const height = rect.height;

  const beginY = top - clientHeight;

  let scrollBegin = 0;
  if (startType === 'contain') {
    scrollBegin = beginY + height + clientHeight * startPercent - height * startPercent;
  } else if (startType === 'cover') {
    scrollBegin = beginY + clientHeight * startPercent + height * startPercent;
  }

  let scrollEnd = 0;
  if (endType === 'contain') {
    scrollEnd = beginY + height + clientHeight * endPercent - height * endPercent;
  } else if (endType === 'cover') {
    scrollEnd = beginY + clientHeight * endPercent + height * endPercent;
  }

  return [scrollBegin, scrollEnd];
}

type ParsedRange = [type: CSSRangeType, percent: number];

function parseRange(range: CSSRangeUnit): ParsedRange {
  const [type, percent] = range.split(' ');
  return [type as CSSRangeType, parseFloat(percent) / 100];
}
