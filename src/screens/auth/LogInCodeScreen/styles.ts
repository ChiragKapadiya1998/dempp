import { StyleSheet } from 'react-native';
import { Metrics } from '../../../styles';
import { hp } from '../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: hp(4.2),
  },
  scroll: {
    flexGrow: 1,
    width: Metrics.screenWidth,
  },
  alternativeActionText: {
    marginTop: hp(3),
    fontFamily: fontFamily.rf_medium,
    fontWeight: '500',
  },
  errorMessage: {
    marginVertical: hp(2.3),
  },
  logoContainer: {
    alignItems: 'center',
  },
  loginButton: {
    marginHorizontal: AUTH_HORIZONTAL_SPACE,
  },
});
