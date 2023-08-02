import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../../styles';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';

export default StyleSheet.create({
  image: {
    borderRadius: 23,
    height: 46,
    marginLeft: HORIZONTAL_MARGIN,
    marginTop: 4,
    resizeMode: FastImage.resizeMode.cover,
    width: 46,
  },
  tagline: {
    color: Colors.greyish2,
    marginTop: 16,
  },

  avatar: {
    borderRadius: 50,
    height: 46,
    marginLeft: HORIZONTAL_MARGIN,
    marginTop: 4,
    width: 46,
    backgroundColor: Colors.primary1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
});
