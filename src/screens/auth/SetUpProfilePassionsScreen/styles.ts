import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../styles';
import { hp } from '../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    backgroundColor: Colors.white,
    elevation: 1,
    flexGrow: 1,
    width: Metrics.screenWidth,
    paddingBottom: 16,
  },
  errorMessage: {
    marginHorizontal: HORIZONTAL_MARGIN,
    marginTop: hp(1),
  },
  saveButton: {
    marginTop: hp(3.5),
    margin: HORIZONTAL_MARGIN,
  },
  stepper: {
    paddingTop: hp(2.7),
  },
  submitButton: {
    marginBottom: 16,
    marginTop: 29,
  },
  catagoriesContainer: {
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
});
