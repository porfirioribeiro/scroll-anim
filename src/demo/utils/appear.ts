import { ObjectDirective } from 'vue';

const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle(
        'v-appear',
        entry.isIntersecting && entry.boundingClientRect.bottom < window.innerHeight,
      );
    }
  },
  { threshold: [1] },
);

export const vAppear: ObjectDirective<HTMLElement> = {
  mounted: (el) => io.observe(el),
  unmounted: (el) => io.unobserve(el),
};
