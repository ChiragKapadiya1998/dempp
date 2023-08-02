import { StyleSheet } from 'react-native';
import { wp } from '../../../../../styles/metrics';

export default StyleSheet.create({
  imagesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: wp(100),
    height: wp(100),
  },
  radarImage: {
    height: wp(74),
    width: wp(74),
  },
  logo: {
    position: 'absolute',
    height: wp(9),
    width: wp(9),
  },
});
