import { createScrollViewTimeline } from './createScrollViewTimeline';

export function defineEnterAnimation(options: EnterAnimationOptions) {
  const { target, subject = target, keyframes } = options;
  console.log('defineEnterAnimation', options);
  // let rect: DOMRect;
  // let observing = false;

  const animatable = target.animate(keyframes, {
    duration: 100,
    easing: 'ease-in-out',
    fill: 'forwards',
  });
  animatable.pause();

  const timeline = createScrollViewTimeline({
    subject,
    onScroll: (percent) => {
      animatable.currentTime = percent * 100;
    },
    onEnd: () => {
      animatable.finish();
      timeline.pause();
    },
  });

  return animatable;
}

interface EnterAnimationOptions {
  // element to observe
  target: HTMLElement;
  subject?: HTMLElement;
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null;
}
