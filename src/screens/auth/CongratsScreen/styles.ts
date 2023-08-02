import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../styles';
import { hp } from '../../../styles/metrics';
import { ISIOS } from '../../../utils/hooks';

export default StyleSheet.create({
  startButton: {
    width: Metrics.wp(85),
    backgroundColor: Colors.primary4,
    marginBottom: ISIOS ? hp(5) : hp(8),
  },
});
