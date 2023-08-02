import React, { useEffect, useRef } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StatusBar, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';

import { ISIOS, useAppSelector, useKeyboard } from '../../../utils/hooks';
import { reasons } from '../../../utils/reportReasons';
import useScreen from './useScreen';
import ContactPersonBadge from '../../../components/common/ContactPersonBadge';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import FlatButton from '../../../components/forms/FlatButton';
import TextInput from '../../../components/forms/TextInput';
import { HeadingText, QuestionText, SubmitButtonContainer } from './styled';
import styles from './styles';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';
import NavigationHelper from '../../../utils/NavigationHelper';
import { useNavigation } from '@react-navigation/native';
import { IS_IOS } from '../../../utils/constants';

const ReportScreen = () => {
  const isKeyboardShown = useKeyboard();
  const { call, role } = useAppSelector((state) => state.calls);

  const { getInputExplanationProps, getSubmitButtonProps, requestError, open, setOpen, value, setValue } = useScreen();
  const scrollRef = useRef();
  const { isKeyboardHows } = useKeyboard();

  useEffect(() => {
    if (isKeyboardHows) {
      scrollRef?.current?.scrollToEnd();
    }
  }, [isKeyboardHows]);

  if (!call) return null;

  const { caller, receiver } = call;
  const amICaller = role === 'caller';
  const contactDisplayName = (!amICaller ? caller.name : receiver.name) ?? 'Parla';
  const contactAvatar = !amICaller ? caller?.avatar?.s : receiver?.avatar?.s;
  // const contactDisplayName = 'Parla';
  // const contactAvatar =
  //   'data:image/jpeg;base64,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';
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation();

  return (
    // <SafeAreaView edges={['bottom']} style={styles.screen}>
    <KeyboardAvoidingView
      // keyboardVerticalOffset={100}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.scroll, { flexGrow: 1, paddingBottom: ISIOS ? 0 : isKeyboardHows ? 100 : 0 }]}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={-200}
        bounces={false}
        ref={scrollRef}
      >
        <HeadingText style={styles.reportTextheader}>{'Report user'}</HeadingText>
        <ContactPersonBadge name={contactDisplayName} image={contactAvatar} containerStyle={{ marginTop: hp(1.7) }} />
        <View style={[styles.reasonContainer, { flex: !open ? 0 : 1, minHeight: !open ? 0 : Dimensions.get('window').height / 2 }]}>
          {/* {value ? <Text style={styles.reportText}>{'Report reason'}</Text> : null} */}
          <QuestionText
            style={{ marginHorizontal: wp(6.9), color: Colors.accent19, fontWeight: '600', marginTop: hp(3.2), fontFamily: fontFamily.rf_medium }}
          >
            {'Select the reason for report:'}
          </QuestionText>

          <DropDownPicker
            placeholder={'Reason'}
            open={open}
            value={value}
            searchable={false}
            disableLocalSearch={false}
            searchPlaceholder={'Reason for report'}
            items={reasons}
            setOpen={setOpen}
            setValue={setValue}
            style={[styles.containerStyle, { marginTop: hp(1.9) }]}
            searchPlaceholderTextColor={Colors.greyish1}
            selectedItemContainerStyle={styles.selectedItemContainerStyle}
            searchContainerStyle={{ ...styles.searchContainerStyle, padding: 0, margin: 0, marginLeft: wp(1.7), borderBottomWidth: 0 }}
            searchTextInputProps={{ style: styles.searchInputContainer, editable: false }}
            selectedItemLabelStyle={styles.selectedItemLabelStyle}
            arrowIconStyle={styles.dropdownIcon}
            dropDownContainerStyle={styles.dropDownContainerStyleNew}
            dropDownDirection={'AUTO'}
            bottomOffset={100}
            showTickIcon={false}
            placeholderStyle={styles.placeholderStyle}
            textStyle={styles.textStyle}
            labelStyle={{
              fontFamily: fontFamily.rf_regular,
              fontSize: fontSize(17),
              fontWeight: '400',
              color: Colors.greyish27,
              marginLeft: wp(4.5),
            }}
          />
          <View
            style={{
              borderWidth: 0,
              borderBottomWidth: 0.5,
              borderColor: Colors.secondary16,
              backgroundColor: 'transparent',
              marginLeft: wp(7.5),
              marginRight: wp(7.5),
            }}
          />
        </View>
        {!open && (
          <>
            <View
              style={[
                styles.reasonContainer,
                { flex: !open ? 0 : 1, minHeight: !open ? 0 : Dimensions.get('window').height / 2, marginHorizontal: wp(6.9) },
              ]}
            >
              <QuestionText
                style={{ color: Colors.accent19, fontWeight: '600', marginTop: hp(1.9), fontSize: fontSize(15), fontFamily: fontFamily.rf_medium }}
              >
                {'You can also explain what happened:'}
              </QuestionText>
              <TextInput
                textInputStyle={{
                  paddingBottom: hp(0.98),
                  fontWeight: '400',
                  fontSize: fontSize(17),
                  fontFamily: fontFamily.rf_regular,
                }}
                style={{ marginTop: hp(1.9) }}
                {...getInputExplanationProps()}
                labelHidden={true}
                BottomLineStyle={{ borderWidth: 0.5, borderColor: Colors.secondary16 }}
              />
            </View>
          </>
        )}
        <ErrorMessage containerStyle={styles.errorMessage}>{requestError}</ErrorMessage>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: IS_IOS ? insets?.bottom : insets?.bottom + 10 }}>
          {!open && (
            <SubmitButtonContainer>
              <FlatButton {...getSubmitButtonProps()} />
            </SubmitButtonContainer>
          )}
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
    // </SafeAreaView>
  );
};

export default ReportScreen;
