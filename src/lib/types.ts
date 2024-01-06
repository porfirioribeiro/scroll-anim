export type CSSPercent = `${number}%`;
export type CSSRangeType = 'cover' | 'contain' | 'entry' | 'exit';
export type CSSRangeUnit = CSSRangeType | `${CSSRangeType} ${CSSPercent}`;
