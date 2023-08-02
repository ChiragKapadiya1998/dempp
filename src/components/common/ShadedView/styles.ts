import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../styles';

export default StyleSheet.create({
  container: {
    borderTopLeftRadius: Metrics.wp(8.25),
    borderTopRightRadius: Metrics.wp(8.25),
    backgroundColor: Colors.white,
    shadowColor: 'rgba(13, 47, 97, 0.08)',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: -9,
    },
    shadowRadius: 5,
    elevation: 4,
  },
});
