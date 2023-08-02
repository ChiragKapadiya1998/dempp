import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlatButton from '../../../components/forms/FlatButton';
import { Colors } from '../../../styles';
import styles from './styles';
import { actions as authActions } from '../../../ducks/auth';
import { useAppDispatch } from '../../../utils/hooks';
import { Pages } from '../../../navigators/Routes';

const InvitesSantContacts = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const { params } = useRoute();

  const onPressLogin = () => {
    dispatch(authActions.logoutRequest());
  };

  setTimeout(() => {
    if (params?.data == false) {
      navigate(Pages.MainStack, {
        screen: Pages.HomeScreen,
        initial: false,
      });
      return true;
    }
  }, 5000);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ alignItems: 'center' }}>
        {params?.data == true ? (
          <Image source={require('../../../assets/updatedIcon.png')} style={styles.updatedIconStyle} resizeMode="contain" />
        ) : (
          <Image source={require('../../../assets/InvitesSant.png')} style={styles.imageStyles} resizeMode="contain" />
        )}
        {params?.data == true ? (
          <>
            <Text style={styles.invitesText}>{'Phone number is updated!'}</Text>
            <Text style={[styles.invitesSubText, { color: Colors.accent19, letterSpacing: -1 }]}>{'Now you can log in with your new number'}</Text>
          </>
        ) : (
          <>
            <Text style={styles.invitesText}>{params?.from == 'Invites' ? 'Invites sent!' : 'Invite sent!'}</Text>
            <Text style={styles.invitesSubText}>{'Thank you for growing the Parlapp\n community :)'}</Text>
          </>
        )}
      </View>
      {params?.data == true && (
        <FlatButton
          title={'Log in'}
          onPress={onPressLogin}
          variant={'solid1'}
          // disabled={code.length !== 6}
          // loading={loading}
          containerStyle={[styles.submitButton, { backgroundColor: Colors.primary4 }]}
        />
      )}
    </SafeAreaView>
  );
};

export default InvitesSantContacts;
