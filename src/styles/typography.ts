import styled from 'styled-components/native';
import { black } from './colors';
import { fontSize } from './metrics';

/**
 * System font family for iOS is San Francisco and for Android - Roboto
 */
export const fontFamily = 'System';
const fontColor = black;

export const Large = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(34)}px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.37px;
  line-height: ${fontSize(38)}px;
`;

export const Large1 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(32)}px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.37px;
  line-height: ${fontSize(41)}px;
`;

export const H1 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(28)}px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.36px;
  line-height: ${fontSize(33)}px;
`;

export const H2 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.35px;
  line-height: 28px;
`;

export const H3 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(20)}px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.38px;
  line-height: ${fontSize(24)}px;
`;

export const Headline = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(17)}px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.41px;
  line-height: ${fontSize(22)}px;
`;

export const Subheadline = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(15)}px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.24px;
  line-height: 20px;
`;

export const Body1 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(17)}px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.41px;
  line-height: ${fontSize(22)}px;
`;

export const Body2 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(17)}px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.41px;
  line-height: ${fontSize(22)}px;
`;

export const Body3 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.24px;
  line-height: 20px;
`;

export const Body4 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(15)}px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.24px;
  line-height: ${fontSize(20)}px;
`;
export const Body5 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(15)}px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.24px;
  line-height: ${fontSize(20)}px;
`;
export const Caption1 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: 12px;
  font-style: italic;
  font-weight: 500;
  line-height: 16px;
`;

export const Caption2 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(11)}px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0.07px;
`;

export const Rubric1 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.13px;
  line-height: 18px;
  text-transform: uppercase;
`;

export const Rubric2 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(11)}px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.41px;
  line-height: ${fontSize(16)}px;
  text-transform: uppercase;
`;
export const Rubric3 = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: ${fontSize(15)}px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.41px;
  line-height: ${fontSize(16)}px;
`;

export const Footnote = styled.Text`
  color: ${fontColor};
  font-family: ${fontFamily};
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.08px;
  line-height: 16px;
  text-transform: uppercase;
`;
