import { ScrollViewTimeline, createScrollViewTimeline } from './createScrollViewTimeline';
import { CSSRangeUnit } from './types';

export function defineEnterAnimation(options: EnterAnimationOptions): EnterAnimation {
  const { target, subject = target, keyframes, noNative, rangeStart, rangeEnd } = options;
  console.log('defineEnterAnimation', options);

  let nativeTimeline: AnimationTimeline | undefined = undefined;
  let scrollViewTimeline: ScrollViewTimeline | undefined = undefined;

  if (!noNative && 'ViewTimeline' in window) {
    nativeTimeline = new ViewTimeline({
      subject,
    });
  }

  const animatable = target.animate(keyframes, {
    duration: 100,
    fill: 'both',
    timeline: nativeTimeline,
    rangeStart,
    rangeEnd,
  });

  let onEnd: () => void = () => {};

  const finished = new Promise<EnterAnimation>((resolve) => (onEnd = () => resolve(enterAnimation)));

  if (!nativeTimeline) {
    animatable.pause();

    scrollViewTimeline = createScrollViewTimeline({
      subject,
      rangeStart,
      rangeEnd,
      onScroll(value) {
        animatable.currentTime = value * 100;
      },
      onEnd,
    });
  } else {
    animatable.onfinish = onEnd;
  }

  const enterAnimation: EnterAnimation = {
    finished,
    pause() {
      if (scrollViewTimeline) scrollViewTimeline.pause();
      else animatable.pause();
    },
    play() {
      if (scrollViewTimeline) scrollViewTimeline.play();
      else animatable.play();
    },
    cancel() {
      animatable.cancel();
      scrollViewTimeline?.cancel();
    },
  };
  return enterAnimation;
}

export interface EnterAnimation {
  finished: Promise<EnterAnimation>;
  pause(): void;
  play(): void;
  cancel(): void;
}

export interface EnterAnimationOptions {
  // element to observe
  target: HTMLElement;
  subject?: HTMLElement;
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null;
  rangeStart?: CSSRangeUnit;
  rangeEnd?: CSSRangeUnit;
  noNative?: boolean;
}
