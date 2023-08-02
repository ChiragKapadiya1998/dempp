import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import TitleSmall from '../../../components/common/TitleSmall';
import CurrentPhone from './CurrentPhone';
import NewPhone from './NewPhone';
import { ISIOS, useAppSelector, useKeyboard } from '../../../utils/hooks';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp, wp } from '../../../styles/metrics';
import LinearGradient from 'react-native-linear-gradient';
import SvgIcon from '../../../components/common/SvgIcon';
import { Colors } from '../../../styles';
import { parsePhoneNumber } from 'libphonenumber-js';
import { ValueType } from 'react-native-dropdown-picker';

const ChangePhoneScreen = () => {
  const { isKeyboardHows } = useKeyboard();
  const [newNumbarShow, setNewNumbarShow] = useState(true);
  const { data: user } = useAppSelector((state) => state.user);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const inset = useSafeAreaInsets();

  useEffect(() => {
    if (user?.phone) {
      try {
        const parsed = parsePhoneNumber(user.phone);

        if (parsed.isValid()) {
          setPhoneNumber(parsed.number as string);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }, [user?.phone]);

  if (!newNumbarShow) {
    return (
      <View style={[styles.mainContent, { paddingTop: hp(4) }]}>
        <NewPhone />
      </View>
    );
  }

  return (
    <View style={[styles.mainContent, { paddingTop: hp(4) }]}>
      <KeyboardAwareScrollView style={styles.mainContent} bounces={false} keyboardShouldPersistTaps={'handled'}>
        <View style={{ flex: 1 }}>
          <TitleSmall style={[styles.titleSmall]}>{'CuRRENT number'}</TitleSmall>
          <View style={styles.phoneContent}>
            <Text style={styles.numText}>{`${phoneNumber}`}</Text>
          </View>
          <Text style={styles.numSubText}>{'You can change your Parlapp number here.\nYour account will be moved to the new number'}</Text>
        </View>
      </KeyboardAwareScrollView>
      <TouchableOpacity onPress={() => setNewNumbarShow(false)}>
        <LinearGradient
          colors={['#2454FF', '#2454FF']}
          style={[styles.deleteMainContent, { marginBottom: ISIOS ? inset.bottom : inset.bottom + hp(1.6) }]}
        >
          <View style={styles.deleteStyle}>
            <Text style={styles.deleteText}>{'Change phone number'}</Text>
            <SvgIcon name="right-arrow-icon" height={wp(4)} color={Colors.white} />
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* </ScrollView> */}
    </View>
  );
};

export default ChangePhoneScreen;

{
  /* <KeyboardAvoidingView behavior={ISIOS ? 'height' : 'padding'} style={{ flexGrow: 1 }}> */
}
{
  /* <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          // extraScrollHeight={-250}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{ flexGrow: isKeyboardHows ? 0 : 1, borderWidth: 1 }}
        > */
}
{
  /* <TitleSmall style={[styles.titleSmall]}>{'New number'}</TitleSmall> */
}
{
  /* <NewPhone />; */
}
{
  /* {isKeyboardHows && Platform.OS == 'android' && <View style={{ height: hp(10) }} />} */
}
{
  /* </KeyboardAwareScrollView> */
}
{
  /* </KeyboardAvoidingView> */
}
