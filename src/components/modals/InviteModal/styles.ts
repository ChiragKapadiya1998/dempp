import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
  },
  modal: {
    paddingVertical: 16,
    paddingHorizontal: 21,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 17,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: Colors.black,
    textAlign: 'center',
  },
});
