import { MaybeRef, toRef, watch } from 'vue';
import { EnterAnimationOptions, defineEnterAnimation } from './scroll';

export function useScrollAnimation({ target, subject = target, ...o }: ScrollAnimationOptions) {
  console.log('useScrollAnimation', target, subject);
  watch([toRef(target), toRef(subject)], ([target, subject], [oldTarget, oldSubject], onCleanup) => {
    console.log('watch', target, subject);
    if (!target || !subject || (target == oldTarget && subject == oldSubject)) return;

    const anim = defineEnterAnimation({ target, subject, ...o });
    onCleanup(anim.cancel);
  });
}

export interface ScrollAnimationOptions extends Omit<EnterAnimationOptions, 'target' | 'subject'> {
  target: MaybeRef<HTMLElement | null>;
  subject?: MaybeRef<HTMLElement | null>;
}
