import { StyleSheet } from 'react-native';
import { Metrics } from '../../../styles';
import { AUTH_HORIZONTAL_SPACE } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Metrics.hp(4.2),
  },
  scroll: {
    flexGrow: 1,
    width: Metrics.screenWidth,
  },
  alternativeActionText: {
    marginTop: Metrics.hp(3),
    fontFamily: fontFamily.rf_medium,
    fontWeight: '500',
  },
  errorMessage: {
    marginTop: Metrics.hp(2.3),
  },
  submitButton: {
    marginHorizontal: AUTH_HORIZONTAL_SPACE,
  },
  phoneTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
