import { CSSRangeType, CSSRangeUnit } from './types';

export type AnimationState = 'start' | 'running' | 'end';

const isScrollEndSupported = 'onscrollend' in window;

export function createScrollViewTimeline({
  subject,
  rangeStart = 'cover 0%',
  rangeEnd = 'cover 100%',
  onScroll,
  onEnd,
}: ScrollViewTimelineOptions) {
  let pos: ReturnType<typeof calculatePos> = calculatePos(subject.getBoundingClientRect(), rangeStart, rangeEnd);
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

  function startScrollObserve(rect: DOMRect) {
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

  let timer: number | undefined = undefined;

  function play() {
    // todo: throw error if already cancelled
    io.observe(subject);
    // IntersectionObserver doesn't trigger when scroll fasts
    if (isScrollEndSupported) window.addEventListener('scrollend', handleScroll, { passive: true });
    else timer = setInterval(handleScroll, 1000) as unknown as number;
  }

  function pause() {
    stopScrollObserve();
    io.unobserve(subject);
    if (isScrollEndSupported) window.removeEventListener('scrollend', handleScroll);
    else clearInterval(timer);
  }

  function cancel() {
    pause();
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
  const [startType, startPercent] = parseRange(rangeStart, 0);
  const [endType, endPercent] = parseRange(rangeEnd, 1);

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
  } else if (startType === 'entry') {
    scrollBegin = beginY + height * startPercent;
  } else if (startType === 'exit') {
    scrollBegin = beginY + clientHeight + height * startPercent;
  }

  let scrollEnd = 0;
  if (endType === 'contain') {
    scrollEnd = beginY + height + clientHeight * endPercent - height * endPercent;
  } else if (endType === 'cover') {
    scrollEnd = beginY + clientHeight * endPercent + height * endPercent;
  } else if (endType === 'entry') {
    scrollEnd = beginY + height * endPercent;
  } else if (endType === 'exit') {
    scrollEnd = beginY + clientHeight + height * endPercent;
  }

  return [scrollBegin, scrollEnd];
}

type ParsedRange = [type: CSSRangeType, percent: number];

function parseRange(range: CSSRangeUnit, def = 1): ParsedRange {
  const [type, percent] = range.split(' ');
  return [type as CSSRangeType, percent ? parseFloat(percent) / 100 : def];
}
