import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE, HORIZONTAL_MARGIN } from '../../../utils/constants';

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  stepper: {
    marginTop: hp(2.7),
  },
  uploadProfileImageButton: {
    marginLeft: 34,
    alignSelf: 'center',
    backgroundColor: Colors.secondary6,
    borderColor: Colors.primary1,
  },
  uploadProfileImageButtonTxt: {
    fontSize:fontSize(17),
    fontWeight: 'normal',
    color: Colors.primary1,
    marginLeft: wp(2.5),
  },
  usernameInput: {
    marginTop: hp(2.5),
  },
  continueButton: {
    marginVertical: 16,
  },
  textInput: {
    marginTop: hp(1.5),
  },
  taglineInput: {
    minHeight: hp(14),
  },
  errorMessage: {
    marginTop: 4,
  },
  audioPlayer: {
    marginLeft: AUTH_HORIZONTAL_SPACE,
    marginRight: AUTH_HORIZONTAL_SPACE,
  },
  bottonButton: {
    margin: HORIZONTAL_MARGIN,
  },
});
