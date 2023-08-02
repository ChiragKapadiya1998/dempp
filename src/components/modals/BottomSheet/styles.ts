import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';

export default StyleSheet.create({
  overlay: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  shadowContainer: {
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  container: {
    backgroundColor: Colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
    paddingBottom: 20,
  },
});
