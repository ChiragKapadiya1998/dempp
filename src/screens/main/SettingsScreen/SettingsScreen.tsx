import React, { useRef, FC, useEffect } from 'react';
import { Switch, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getVersion, getBuildNumber } from 'react-native-device-info';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions } from '../../../ducks/auth';
import { actions as usetActions } from '../../../ducks/user';
import { SettingsStackParamsList } from '../../../navigators/types';
import { SettingsStackPages, Pages } from '../../../navigators/Routes';
import { SvgIconName } from '../../../components/common/SvgIcon/types';
import { AlertType } from '../../../components/modals/Alert/types';
import SvgIcon from '../../../components/common/SvgIcon';
import TitleSmall from '../../../components/common/TitleSmall';
import Alert from '../../../components/modals/Alert';
import styles from './styles';
import { hp } from '../../../styles/metrics';
import NavigationHelper from '../../../utils/NavigationHelper';

type Link = {
  title: string;
  iconName: string;
  iconHeight: number;
  linkText?: string;
  switcher?: boolean;
  hideDivider?: boolean;
  hideArrow?: boolean;
  extraMarginLeft?: number;
  onPress: () => void;
};

const LinkItemRender: FC<Link> = ({
  title,
  onPress,
  linkText = '',
  switcher = false,
  hideDivider = false,
  hideArrow = false,
  iconName,
  iconHeight,
  extraMarginLeft = 0,
}) => (
  <TouchableOpacity style={[styles.settigsItem, { borderBottomWidth: hideDivider ? 0 : 0.5 }]} onPress={onPress}>
    <View style={styles.row}>
      <SvgIcon name={iconName as SvgIconName} height={iconHeight} color={'#BCC3CC'} />
      <Text style={[styles.listItemTitle, { marginLeft: 24 - iconHeight + 8 + extraMarginLeft }]}>{title}</Text>
    </View>

    {switcher ? (
      <Switch />
    ) : (
      <View style={styles.rightSide}>
        <Text style={styles.linkText}>{linkText}</Text>
        {hideArrow ? null : <SvgIcon name="right-small-chevron" height={12} color="rgba(60, 60, 67, 1)" style={styles.icon} />}
      </View>
    )}
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const { username } = useAppSelector((state) => state.token);
  const { data: user } = useAppSelector((state) => state.user);
  const { userName } = useAppSelector((state) => state.auth);

  const { navigate } = useNavigation();

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<SettingsStackParamsList>>();
  const appSettingLinks: Link[] = useRef([
    {
      title: 'My Profile',
      linkText: user?.isProfileFilled ? 'Edit' : 'Set up',
      iconName: 'profile-icon',
      iconHeight: 24,
      onPress: () => {
        user?.isProfileFilled
          ? navigation.navigate(SettingsStackPages.EditProfileScreen)
          : navigate(Pages.SetUpProfileStack, {
              screen: Pages.OnboardingSettingUp,
              initial: false,
              params: { username: userName ? userName : username },
            });
      },
    },
    {
      title: 'Notification',
      iconName: 'notification-icon',
      iconHeight: 24,
      onPress: () => navigation.navigate(SettingsStackPages.NotificationScreen),
    },
    {
      title: 'Notifications sound',
      iconName: 'notificationSound',
      iconHeight: 24,
      onPress: () => navigation.navigate(SettingsStackPages.NotificationSoundScreen),
    },
    // {
    //   title: 'Max. number of incoming queries',
    //   linkText: '15',
    //   iconName: 'download-icon',
    //   iconHeight: 24,
    //   onPress: () => {},
    // },
    // {
    //   title: 'Delete my Parlapp Profile',
    //   iconName: 'download-icon',
    //   iconHeight: 24,
    //   onPress: () => navigation.navigate(SettingsStackPages.DeleteUserScreen),
    // },
  ]).current;

  const alertRef = useRef<AlertType>(null);

  const generalLinks: Link[] = useRef([
    {
      title: 'Change phone number',
      iconName: 'call-icon',
      iconHeight: 22,
      extraMarginLeft: 0,
      onPress: () => navigation.navigate(SettingsStackPages.ChangePhoneStack),
    },
    {
      title: 'Terms and Conditions',
      iconName: 'paper-icon',
      iconHeight: 24,
      extraMarginLeft: 2,
      onPress: () => navigation.navigate(SettingsStackPages.TermsScreen),
    },
    {
      title: 'Privacy Policy',
      iconName: 'shield-done-icon',
      iconHeight: 25,
      extraMarginLeft: 7,
      onPress: () => navigation.navigate(SettingsStackPages.PrivacyPolicyScreen),
    },
    {
      title: 'Feedback',
      iconName: 'feedback-option-icon',
      iconHeight: 23,
      extraMarginLeft: 3,
      onPress: () => navigation.navigate(SettingsStackPages.FeedbackScreen),
    },
    {
      title: 'Help',
      iconName: 'helpIcon',
      iconHeight: 24,
      extraMarginLeft: 4,
      onPress: () => navigation.navigate(SettingsStackPages.HelpScreen),
    },
  ]).current;

  const onLogoutPress = () => alertRef.current?.open();

  useEffect(() => {
    dispatch(usetActions.getUserRequest());
  }, []);

  const onLogoutConfirm = async () => {
    dispatch(usetActions.updateUserRequest({ isActive: false }));
    dispatch(actions.logoutRequest());
    alertRef.current?.close();
    NavigationHelper.goToLoginScreen();
  };

  const versionText = `Parlapp version ${getVersion()}.${getBuildNumber()}`;

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} bounces={false}>
        <TitleSmall style={styles.title}>App settings</TitleSmall>
        <View style={styles.listContainer}>
          {appSettingLinks.map((link, index) => (
            <LinkItemRender key={link.title} {...link} hideDivider={index + 1 === appSettingLinks.length} />
          ))}
        </View>

        <TitleSmall style={[styles.title, { marginTop: hp(3.8) }]}>General</TitleSmall>
        <View style={styles.listContainer}>
          {generalLinks.map((link, index) => (
            <LinkItemRender key={link.title} {...link} hideDivider={index + 1 === generalLinks.length} />
          ))}
        </View>

        <View style={[styles.listContainer, styles.logout]}>
          <LinkItemRender
            title={'Log out'}
            iconName={'login-icon'}
            iconHeight={20}
            extraMarginLeft={4}
            onPress={onLogoutPress}
            hideArrow={false}
            hideDivider={true}
          />
        </View>
        <View style={[styles.listContainer, styles.logout]}>
          <LinkItemRender
            title={'Delete profile'}
            iconName={'deleteprofile-icon'}
            iconHeight={20.1}
            extraMarginLeft={4}
            onPress={() => navigation.navigate(SettingsStackPages.DeleteUserScreen)}
            hideArrow={true}
            hideDivider={true}
          />
        </View>
        <Text style={styles.versionText}>{versionText}</Text>
        <Alert
          ref={alertRef}
          btnContentStyle={{ flex: 1 }}
          title="Log out"
          message="Are you sure you want to log out?"
          buttons={[
            {
              text: 'Cancel',
              onPress: () => alertRef.current?.close(),
            },
            {
              text: 'Log out',
              variant: 'destructive',
              onPress: onLogoutConfirm,
            },
          ]}
        />
      </ScrollView>
    </View>
  );
};
export default SettingsScreen;
