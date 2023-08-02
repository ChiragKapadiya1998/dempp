import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, wp } from '../../../styles/metrics';

export default StyleSheet.create({
  container: {
    marginRight: wp(4),
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(8.5),
    width: wp(8.5),
    borderRadius: wp(8.5),
    // backgroundColor: Colors.primary1,
  },
  avatarText: {
    fontSize: fontSize(16),
    fontWeight: 'bold',
    color: Colors.white,
  },
  icon: {
    position: 'absolute',
    right: -wp(1.5),
    top: -wp(0.5),
    backgroundColor: Colors.greyish6,
    borderRadius: wp(5),
    height: wp(5),
    width: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
