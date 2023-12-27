/// <reference types="new-javascript" />

import { CSSRangeUnit } from './types';

// extend the global AnimationTimeline interface
declare global {
  interface KeyframeAnimationOptions {
    rangeStart?: CSSRangeUnit;
    rangeEnd?: CSSRangeUnit;
  }
}
