import { MixedStyleDeclaration } from 'react-native-render-html';
import { Colors, Typography } from '../styles';
import { fontSize } from '../styles/metrics';
import { fontFamily } from './functions';

export const tagsStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
  h1: {
    fontFamily: fontFamily.rf_medium,
    color: Colors.accent19,
    fontSize: fontSize(15),
    fontWeight: '700',
    letterSpacing: -0.42,
    marginTop: 16,
    marginBottom: 2,
    marginHorizontal: 16,
  },
  p: {
    fontFamily: fontFamily.rf_regular,
    color: Colors.accent19,
    fontSize: fontSize(14),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.34,
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  ul: {
    fontFamily: fontFamily.rf_regular,

    color: Colors.black,
    // fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.24,
    marginTop: 8,
    marginBottom: 0,
    marginHorizontal: 16,
  },
  ol: {
    fontFamily: fontFamily.rf_regular,
    color: Colors.black,
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.24,
    marginTop: 8,
    marginBottom: 0,
    marginHorizontal: 16,
  },
  li: {
    marginBottom: 8,
  },
};
