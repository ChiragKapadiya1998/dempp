import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../../styles';
import { HORIZONTAL_MARGIN } from '../../../../../utils/constants';

export default StyleSheet.create({
  preloader: {
    alignSelf: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    width: Metrics.screenWidth,
  },
  modal: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: HORIZONTAL_MARGIN,
    maxWidth: 270,
    borderRadius: 14,
  },
});
