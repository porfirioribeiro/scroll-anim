import { createScrollViewTimeline } from './createScrollViewTimeline';

export function defineEnterAnimation(options: EnterAnimationOptions) {
  const { subject, keyframes } = options;
  console.log('defineEnterAnimation', options);
  // let rect: DOMRect;
  // let observing = false;

  const animatable = subject.animate(keyframes, {
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
  subject: HTMLElement;
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null;
}
