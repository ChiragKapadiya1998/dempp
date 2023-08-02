import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

export default StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: 60,
    height: 60,
    borderRadius: 100,
    resizeMode: FastImage.resizeMode.cover,
  },
});
