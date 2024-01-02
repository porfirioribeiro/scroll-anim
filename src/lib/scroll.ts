import { createScrollViewTimeline } from './createScrollViewTimeline';
import { CSSRangeUnit } from './types';

export function defineEnterAnimation(options: EnterAnimationOptions) {
  const { target, subject = target, keyframes, noNative, rangeStart, rangeEnd } = options;
  console.log('defineEnterAnimation', options);

  let nativeTimeline: AnimationTimeline | undefined = undefined;

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
  animatable.onfinish = () => {
    console.log('onfinish');
  };

  if (!nativeTimeline) {
    animatable.pause();
    createScrollViewTimeline({
      subject,
      rangeStart,
      rangeEnd,
      onScroll(value, oldValue, state) {
        console.log('onScroll', value, oldValue, state);
        animatable.currentTime = value * 100;
      },
    });
  }

  return {
    destroy() {
      animatable.cancel();
    },
  };
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
