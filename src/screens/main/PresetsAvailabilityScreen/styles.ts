import { PixelRatio, StyleSheet } from 'react-native';
import { Colors } from '../../../styles';

export default StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 29,
    flex: 1,
  },
  item: {
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: Colors.greyish1,
    fontSize: 17,
  },
  selectors: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  picker: {
    flex: 1,
    fontSize: 22,
    color: Colors.greyish1,
  },
  animatedPickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#D1D5DB',
    padding: 6,
  },
  bgLayout: {
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  time: {
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    marginHorizontal: 6,
    padding: 5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: 'rgba(118, 118, 128, 0.42)',
  },
  timeText: {
    fontSize: 17,
    color: Colors.greyish1,
  },
  queries: {
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    minWidth: 86,
    marginHorizontal: 6,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft: 'auto',
    fontSize: 17,
    color: Colors.greyish1,
  },
  disturbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disturbItem: {
    backgroundColor: 'transparent',
    paddingVertical: 9,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
    zIndex: 1000,
  },
  disturbText: {
    color: Colors.greyish3,
    fontSize: 17,
  },
  goButton: {
    backgroundColor: Colors.accent7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  goButtonText: {
    fontSize: 17,
    color: '#FFF',
    fontWeight: '600',
  },
  icon: {
    marginLeft: 8,
  },
});
