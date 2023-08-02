import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';

export default StyleSheet.create({
  extendTime: {
    alignItems: 'center',
    flex: 0.4,
  },
  addTimeButton: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary2,
    borderRadius: 14,
    marginTop: 4,
  },
  addTimeButtonDisabled: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    backgroundColor: Colors.greyish7,
    borderRadius: 14,
    marginTop: 4,
  },
  addTimeButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
  },
  addTimeButtonTextDisabled: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.greyish8,
  },
});
