import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { isIphoneX } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    top: Platform.select({
      ios: isIphoneX() ? 64 + 22 : 64,
      android: 56,
    }),
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menu: {
    backgroundColor: '#FFF',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 13,
    paddingHorizontal: 16,
    minWidth: Dimensions.get('window').width > 320 ? 336 : Dimensions.get('window').width - 16,
    borderRadius: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
  },
  bordered: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#C6C6C8',
  },
  title: {
    fontSize: 11,
    color: Colors.greyish2,
  },
  label: {
    fontSize: 17,
    color: Colors.greyish1,
  },
  value: {
    fontSize: 17,
    color: Colors.greyish3,
    marginLeft: 'auto',
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withButtonItem: {
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goButton: {
    marginLeft: 10,
    minWidth: 66,
    minHeight: 32,
    backgroundColor: Colors.accent7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  disturb: {
    marginLeft: 10,
  },
});
