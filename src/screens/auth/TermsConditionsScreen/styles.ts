import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../styles';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    backgroundColor: Colors.white,
    elevation: 1,
    flexGrow: 1,
    paddingBottom: 20,
    width: Metrics.screenWidth,
    paddingTop: 16,
  },
});
