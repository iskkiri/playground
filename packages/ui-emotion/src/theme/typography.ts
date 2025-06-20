import { css } from '@emotion/react';

const heading1Style = css`
  font-size: 54px;
  font-style: normal;
  line-height: 68px;
`;

const heading2Style = css`
  font-size: 46px;
  font-style: normal;
  line-height: 58px;
`;

const heading3Style = css`
  font-size: 38px;
  font-style: normal;
  line-height: 48px;
`;

const heading4Style = css`
  font-size: 34px;
  font-style: normal;
  line-height: 44px;
`;

const heading5Style = css`
  font-size: 30px;
  font-style: normal;
  line-height: 40px;
`;

const heading6Style = css`
  font-size: 26px;
  font-style: normal;
  line-height: 36px;
`;

const heading7Style = css`
  font-size: 22px;
  font-style: normal;
  line-height: 32px;
`;

const paragraph1Style = css`
  font-size: 18px;
  font-style: normal;
  line-height: 28px;
`;

const paragraph2Style = css`
  font-size: 16px;
  font-style: normal;
  line-height: 26px;
`;

const paragraph3Style = css`
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
`;

const paragraph4Style = css`
  font-size: 14px;
  font-style: normal;
  line-height: 22px;
`;

const paragraph5Style = css`
  font-size: 12px;
  font-style: normal;
  line-height: 18px;
`;

const typography = {
  'H1/56r': css`
    ${heading1Style};
    font-weight: 400;
  `,
  'H1/56b': css`
    ${heading1Style};
    font-weight: 700;
  `,

  'H2/48r': css`
    ${heading2Style};
    font-weight: 400;
  `,
  'H2/48b': css`
    ${heading2Style};
    font-weight: 700;
  `,

  'H3/40r': css`
    ${heading3Style};
    font-weight: 400;
  `,
  'H3/40b': css`
    ${heading3Style};
    font-weight: 700;
  `,

  'H4/36r': css`
    ${heading4Style};
    font-weight: 400;
  `,
  'H4/36b': css`
    ${heading4Style};
    font-weight: 700;
  `,

  'H5/32r': css`
    ${heading5Style};
    font-weight: 400;
  `,
  'H5/32b': css`
    ${heading5Style};
    font-weight: 700;
  `,

  'H6/28r': css`
    ${heading6Style};
    font-weight: 400;
  `,
  'H6/28b': css`
    ${heading6Style};
    font-weight: 700;
  `,

  'H7/24r': css`
    ${heading7Style};
    font-weight: 400;
  `,
  'H7/24b': css`
    ${heading7Style};
    font-weight: 700;
  `,

  'P1/20r': css`
    ${paragraph1Style};
    font-weight: 400;
  `,
  'P1/20b': css`
    ${paragraph1Style};
    font-weight: 700;
  `,

  'P2/18r': css`
    ${paragraph2Style};
    font-weight: 400;
  `,
  'P2/18b': css`
    ${paragraph2Style};
    font-weight: 700;
  `,

  'P3/16r': css`
    ${paragraph3Style};
    font-weight: 400;
  `,
  'P3/16b': css`
    ${paragraph3Style};
    font-weight: 700;
  `,

  'P4/14r': css`
    ${paragraph4Style};
    font-weight: 400;
  `,
  'P4/14b': css`
    ${paragraph4Style};
    font-weight: 700;
  `,

  'P5/12r': css`
    ${paragraph5Style};
    font-weight: 400;
  `,
  'P5/12b': css`
    ${paragraph5Style};
    font-weight: 700;
  `,
};

export default typography;
