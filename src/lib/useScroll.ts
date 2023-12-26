import { MaybeRef, watch } from 'vue';

export function useScrollAnimation({ target, subject = target }: ScrollAnimationOptions) {
  console.log('useScrollAnimation', target, subject);
  watch([target, subject], ([target, subject]) => {
    console.log('watch', target, subject);
  });
}

export interface ScrollAnimationOptions {
  target: MaybeRef<HTMLElement | null>;
  subject?: MaybeRef<HTMLElement | null>;
}
