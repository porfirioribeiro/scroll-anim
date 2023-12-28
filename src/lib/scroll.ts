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

  console.log('nativeTimeline', nativeTimeline);

  const animatable = target.animate(keyframes, {
    duration: 100,
    fill: 'both',
    timeline: nativeTimeline,
    rangeStart,
    rangeEnd,
  });

  if (!nativeTimeline) {
    animatable.pause();
    const timeline = createScrollViewTimeline({
      subject,
      rangeStart,
      rangeEnd,
      onScroll: (percent) => {
        animatable.currentTime = percent * 100;
        // console.log('onScroll', percent);
      },
      onEnd: () => {
        // animatable.finish();
        // timeline.pause();
      },
    });
    console.log('timeline', timeline);
  }

  return {
    destroy() {
      console.log('destroy');
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
