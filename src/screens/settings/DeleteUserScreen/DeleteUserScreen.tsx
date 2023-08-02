import React from 'react';
import { Animated, Keyboard, KeyboardAvoidingView, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';

import { ISIOS, useAppSelector, useKeyboard } from '../../../utils/hooks';
import { VALIDATION_CODE_LENGTH } from '../../../utils/constants';
import FlatButton from '../../../components/forms/FlatButton';
import CodeInput from '../../../components/forms/CodeInput';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import SvgIcon from '../../../components/common/SvgIcon';
import useScreen from './useScreen';
import { DescriptionText, DescriptionTextFirstLine, HighlightedText, HighlightedText1, ListItem, ListItemText, MiddleDot } from './styled';
import { Colors } from '../../../styles';
import { hp, wp } from '../../../styles/metrics';
import styles from './styles';
import FlatButtonIcon from '../../../components/common/FlatButtonIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonButton from '../../../components/common/CommonButton';

const DeleteUserScreen = () => {
  // const { isKeyboardHows } = useKeyboard();
  const phone = useAppSelector((state) => state.user.data?.phone ?? '');
  const { isKeyboardHows } = useKeyboard();

  const { code, isScreenOtp, getConfrimButtonProps, onDeleteMyProfile, onChangeCode, onConfirmPress, onResendCode, requestError } = useScreen();

  return (
    <>
      <View style={{ flex: 1, backgroundColor: Colors.secondary5 }}>
        {isScreenOtp ? (
          <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Animated.View style={[styles.headingContent]}>
                <View style={{ alignSelf: 'center', marginTop: hp(8) }}>
                  <SvgIcon name="illustration" height={160} color={Colors.primary4} />
                </View>
                <View style={{ marginTop: hp(5), marginBottom: hp(4) }}>
                  <DescriptionTextFirstLine>You&apos;re about to delete your Parlapp Profile.</DescriptionTextFirstLine>
                  <DescriptionText>
                    This action is <HighlightedText1>irreversible</HighlightedText1>, include:
                  </DescriptionText>
                  <ListItem>
                    <MiddleDot>&middot;</MiddleDot>
                    <ListItemText>Deleting of the Profile</ListItemText>
                  </ListItem>
                  <ListItem>
                    <MiddleDot>&middot;</MiddleDot>
                    <ListItemText>Catched data</ListItemText>
                  </ListItem>
                  <ListItem>
                    <MiddleDot>&middot;</MiddleDot>
                    <ListItemText>History of your queries</ListItemText>
                  </ListItem>
                  <ListItem>
                    <MiddleDot>&middot;</MiddleDot>
                    <ListItemText>All the connections and conversations.</ListItemText>
                  </ListItem>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
            <FlatButtonIcon
              isLinearGradient={true}
              gradientColors={['#F21F52', '#FF5881']}
              title={'Delete my profile'}
              containerStyle={styles.deleteMainContent}
              onPress={onDeleteMyProfile}
            />
          </>
        ) : (
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Text style={[styles.title, { marginTop: hp(3.2) }]}>{'Confirm you want to\ndelete Parlapp profile'}</Text>
            </TouchableWithoutFeedback>
            {/* <KeyboardAvoidingView contentContainerStyle={{ flex: 1 }} style={styles.cardContent1} behavior={ISIOS ? 'height' : 'padding'}>
              <View style={{ flex: 1 }}>
                <Animated.View style={{ marginTop: hp(4) }}>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Text style={styles.text}>The code was sent to your phone</Text>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Text style={styles.text}>numbe rending *** {phone?.substring(phone.length - 3)}.</Text>
                  </TouchableWithoutFeedback>
                  <Text style={styles.text}>
                    If you believe it’s missing <HighlightedText onPress={onResendCode}>{'resend the\ncode'}</HighlightedText>.
                  </Text>
                </Animated.View>
                <CodeInput containerStyle={styles.codeInput} length={VALIDATION_CODE_LENGTH} onChangeText={onChangeCode} value={code} />
                <ErrorMessage iconStyle={{ marginTop: hp(0.1) }} showIcon containerStyle={styles.errorMessage}>
                  {requestError}
                </ErrorMessage>
              </View>
              
              <FlatButton {...getConfrimButtonProps()} />
            </KeyboardAvoidingView> */}
            <View style={styles.cardContent1}>
              <KeyboardAvoidingView behavior={ISIOS ? 'height' : 'padding'} style={{ flexGrow: 1 }}>
                <KeyboardAwareScrollView
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                  style={{ flex: 1 }}
                  keyboardShouldPersistTaps={'handled'}
                  contentContainerStyle={{ flexGrow: isKeyboardHows ? 0 : 1 }}
                >
                  <View style={{ flex: 1 }}>
                    <Animated.View style={{ marginTop: hp(4) }}>
                      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Text style={styles.text}>The code was sent to your phone</Text>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Text style={styles.text}>Number ending *** {phone?.substring(phone.length - 3)}.</Text>
                      </TouchableWithoutFeedback>
                      <Text style={styles.text}>
                        If you believe it’s missing <HighlightedText onPress={onResendCode}>{'resend the\ncode'}</HighlightedText>.
                      </Text>
                    </Animated.View>
                    <CodeInput containerStyle={styles.codeInput} length={VALIDATION_CODE_LENGTH} onChangeText={onChangeCode} value={code} />
                    <ErrorMessage iconStyle={{ marginTop: hp(0.1) }} showIcon containerStyle={styles.errorMessage}>
                      {requestError}
                    </ErrorMessage>
                  </View>
                  <CommonButton {...getConfrimButtonProps()} />
                </KeyboardAwareScrollView>
              </KeyboardAvoidingView>
            </View>
          </View>
        )}
      </View>
      {/* <ConfirmationModal onConfirm={onConfirmPress} /> */}
    </>
  );
};

export default DeleteUserScreen;
