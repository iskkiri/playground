import './index.css';

const heading1Style = {
  fontSize: 'var(--font-size-heading1)',
  lineHeight: 'var(--line-height-heading1)',
} as const;

const heading2Style = {
  fontSize: 'var(--font-size-heading2)',
  lineHeight: 'var(--line-height-heading2)',
} as const;

const heading3Style = {
  fontSize: 'var(--font-size-heading3)',
  lineHeight: 'var(--line-height-heading3)',
} as const;

const heading4Style = {
  fontSize: 'var(--font-size-heading4)',
  lineHeight: 'var(--line-height-heading4)',
} as const;

const heading5Style = {
  fontSize: 'var(--font-size-heading5)',
  lineHeight: 'var(--line-height-heading5)',
} as const;

const heading6Style = {
  fontSize: 'var(--font-size-heading6)',
  lineHeight: 'var(--line-height-heading6)',
} as const;

const heading7Style = {
  fontSize: 'var(--font-size-heading7)',
  lineHeight: 'var(--line-height-heading7)',
} as const;

const paragraph1Style = {
  fontSize: 'var(--font-size-paragraph1)',
  lineHeight: 'var(--line-height-paragraph1)',
} as const;

const paragraph2Style = {
  fontSize: 'var(--font-size-paragraph2)',
  lineHeight: 'var(--line-height-paragraph2)',
} as const;

const paragraph3Style = {
  fontSize: 'var(--font-size-paragraph3)',
  lineHeight: 'var(--line-height-paragraph3)',
} as const;

const paragraph4Style = {
  fontSize: 'var(--font-size-paragraph4)',
  lineHeight: 'var(--line-height-paragraph4)',
} as const;

const paragraph5Style = {
  fontSize: 'var(--font-size-paragraph5)',
  lineHeight: 'var(--line-height-paragraph5)',
} as const;

export const typography = {
  /**
   * @fontSize 52px
   * @lineHeight 64px
   * @fontWeight 400
   */
  'H1/56r': {
    ...heading1Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 52px
   * @lineHeight 64px
   * @fontWeight 700
   */
  'H1/56b': {
    ...heading1Style,
    fontWeight: 700,
  },

  /**
   * @fontSize 48px
   * @lineHeight 56px
   * @fontWeight 400
   */
  'H2/48r': {
    ...heading2Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 48px
   * @lineHeight 56px
   * @fontWeight 700
   */
  'H2/48b': {
    ...heading2Style,
    fontWeight: 700,
  },

  /**
   * @fontSize 40px
   * @lineHeight 48px
   * @fontWeight 400
   */
  'H3/40r': {
    ...heading3Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 40px
   * @lineHeight 48px
   * @fontWeight 700
   */
  'H3/40b': {
    ...heading3Style,
    fontWeight: 700,
  },

  /**
   * @fontSize 36px
   * @lineHeight 44px
   * @fontWeight 400
   */
  'H4/36r': {
    ...heading4Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 36px
   * @lineHeight 44px
   * @fontWeight 700
   */
  'H4/36b': {
    ...heading4Style,
    fontWeight: 700,
  },

  /**
   * @fontSize 32px
   * @lineHeight 40px
   * @fontWeight 400
   */
  'H5/32r': {
    ...heading5Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 32px
   * @lineHeight 40px
   * @fontWeight 700
   */
  'H5/32b': {
    ...heading5Style,
    fontWeight: 700,
  },

  /**
   * @fontSize 28px
   * @lineHeight 36px
   * @fontWeight 400
   */
  'H6/28r': {
    ...heading6Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 28px
   * @lineHeight 36px
   * @fontWeight 700
   */
  'H6/28b': {
    ...heading6Style,
    fontWeight: 700,
  },

  /**
   * @fontSize 24px
   * @lineHeight 32px
   * @fontWeight 400
   */
  'H7/24r': {
    ...heading7Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 24px
   * @lineHeight 32px
   * @fontWeight 700
   */
  'H7/24b': {
    ...heading7Style,
    fontWeight: 700,
  },

  /**
   * @fontSize 20px
   * @lineHeight 28px
   * @fontWeight 400
   */
  'P1/20r': {
    ...paragraph1Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 20px
   * @lineHeight 28px
   * @fontWeight 700
   */
  'P1/20b': {
    ...paragraph1Style,
    fontWeight: 700,
  },

  /**
   * @fontSize 18px
   * @lineHeight 26px
   * @fontWeight 400
   */
  'P2/18r': {
    ...paragraph2Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 18px
   * @lineHeight 26px
   * @fontWeight 700
   */
  'P2/18b': {
    ...paragraph2Style,
    fontWeight: 700,
  },

  /**
   * @fontSize 16px
   * @lineHeight 24px
   * @fontWeight 400
   */
  'P3/16r': {
    ...paragraph3Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 16px
   * @lineHeight 24px
   * @fontWeight 700
   */
  'P3/16b': {
    ...paragraph3Style,
    fontWeight: 700,
  },

  /**
   * @fontSize 14px
   * @lineHeight 22px
   * @fontWeight 400
   */
  'P4/14r': {
    ...paragraph4Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 14px
   * @lineHeight 22px
   * @fontWeight 700
   */
  'P4/14b': {
    ...paragraph4Style,
    fontWeight: 700,
  },

  /**
   * @fontSize 12px
   * @lineHeight 18px
   * @fontWeight 400
   */
  'P5/12r': {
    ...paragraph5Style,
    fontWeight: 400,
  },

  /**
   * @fontSize 12px
   * @lineHeight 18px
   * @fontWeight 700
   */
  'P5/12b': {
    ...paragraph5Style,
    fontWeight: 700,
  },
} as const;
