import React from 'react';
import { StyleProp, ViewStyle, RegisteredStyle, TextStyle, View, Text } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import {
  BottomStackParamsList,
  CallStackParamsList,
  GenerateScreenOptionsFunc,
  GenerateTabOptionsFunc,
  MainStackParamList,
  SettingsStackParamsList,
  RootStackParamList,
  ChangePhoneStackParamsList,
} from './types';

import AvatarIconButton from '../components/common/AvatarIconButton';
import SvgIcon from '../components/common/SvgIcon';
import { CallPages } from './Routes';
import LeftChevronButton from '../components/common/Header/components/LeftChevronButton';
import FlatButton from '../components/forms/FlatButton';
import defaultHeaderBarOptions, { defaultTabHeaderOptions } from './defaultHeaderOptions';
import Status from '../components/common/Status';
import { fontSize, hp, wp } from '../styles/metrics';
import TabIconBtn from '../components/common/TabIconBtn';
import { actions } from '../ducks/history';
import { ISIOS, useAppDispatch } from '../utils/hooks';
import { fontFamily } from '../utils/functions';
import { Colors } from '../styles';

const rootTabOptions: GenerateTabOptionsFunc<BottomStackParamsList> = (res) => ({
  tabBarStyle: {
    backgroundColor: Colors.greyish6,
    borderTopColor: Colors.greyish7,
    paddingTop: hp(0.5),
  },
});

const homeTabOptions: GenerateTabOptionsFunc<BottomStackParamsList> = () => ({
  ...defaultTabHeaderOptions,
  headerStyle: { backgroundColor: Colors.secondary17 },
  headerTintColor: defaultHeaderBarOptions.headerTintColor,
  tabBarStyle: defaultTabHeaderOptions.tabBarStyle,
  headerTitleStyle: defaultHeaderBarOptions.headerTitleStyle as RegisteredStyle<TextStyle>,
  headerTitle: 'Parlapp',
  // tabBarLabel: 'Home',
  tabBarIconStyle: { flex: 1 },
  tabBarLabelStyle: defaultTabHeaderOptions.headerTitleStyle as RegisteredStyle<TextStyle>,
  // tabBarIcon: ({ size, color }) => (
  //   <View style={{ alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
  //     <SvgIcon name="home-tab-icon" height={25} color={color !== '#848FA1' ? '#2454FF' : color} />
  //   </View>
  // ),
  headerLeft: () => <Status />,
  headerRight: () => <AvatarIconButton />,
});
const historyTabOptions: GenerateTabOptionsFunc<BottomStackParamsList> = () => ({
  ...defaultTabHeaderOptions,
  headerStyle: defaultHeaderBarOptions.headerStyle as StyleProp<ViewStyle>,
  headerTintColor: defaultHeaderBarOptions.headerTintColor,
  headerTitleStyle: defaultHeaderBarOptions.headerTitleStyle as RegisteredStyle<TextStyle>,
  headerTitle: 'History',
  tabBarIconStyle: { flex: 1 },
  tabBarLabelStyle: defaultTabHeaderOptions.headerTitleStyle as RegisteredStyle<TextStyle>,
  // tabBarIcon: ({ size, color }) => {
  //   const dispatch = useAppDispatch();
  //   return <TabIconBtn size={size} color={color} />;
  // },
  headerLeft: () => <Status />,
  headerRight: () => <AvatarIconButton />,
  tabBarStyle: defaultTabHeaderOptions.tabBarStyle,
});

const blockTabOptions: GenerateScreenOptionsFunc<MainStackParamList> = () => ({
  ...defaultHeaderBarOptions,
  title: 'Parlapp',
  headerLeft: () => null,
});

const inviteTabOptions: GenerateTabOptionsFunc<BottomStackParamsList> = () => ({
  ...defaultTabHeaderOptions,
  headerStyle: defaultHeaderBarOptions.headerStyle as StyleProp<ViewStyle>,
  headerTintColor: defaultHeaderBarOptions.headerTintColor,
  headerTitleStyle: defaultHeaderBarOptions.headerTitleStyle as RegisteredStyle<TextStyle>,
  headerTitleAlign: 'center',
  headerTitle: 'Invite',
  // tabBarLabelStyle: defaultTabHeaderOptions.headerTitleStyle as RegisteredStyle<TextStyle>,

  headerLeft: () => <Status />,
  // tabBarIcon: ({ size, color }) => (
  //   <View style={{ alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
  //     <SvgIcon name="invite-tab-icon" height={25} color={color !== '#848FA1' ? '#2454FF' : color} />
  //   </View>
  // ),
  headerRight: () => <AvatarIconButton />,
});

const feedbackTabOptions: GenerateTabOptionsFunc<BottomStackParamsList> = ({ navigation, route }) => {
  // const focusedRoute = getFocusedRouteNameFromRoute(route);
  return {
    ...defaultHeaderBarOptions,
    title: 'Feedback',
    tabBarIcon: ({ size, color }) => <SvgIcon name="feedback-tab-icon" height={size} color={color} />,
    headerLeft: () => <Status />,
    headerRight: () => <AvatarIconButton />,
  };
};

const presetsAvailabilityOptions: GenerateScreenOptionsFunc<MainStackParamList> = () => ({
  ...defaultHeaderBarOptions,
  title: 'Presets and Availability',
  headerLeft: (props) => <LeftChevronButton {...props} tintColor={Colors.greyish3} />,
});

const settingsScreenOptions: GenerateScreenOptionsFunc<SettingsStackParamsList> = () => ({
  ...defaultHeaderBarOptions,
  title: 'Settings',
  headerLeft: (props) => <LeftChevronButton {...props} tintColor={Colors.greyish3} />,
});

const termsConditionsScreenOptions: GenerateScreenOptionsFunc<SettingsStackParamsList> = () => ({
  header: () => null,
});

const editProfileScreenOptions: GenerateScreenOptionsFunc<SettingsStackParamsList> = () => ({
  ...defaultHeaderBarOptions,
  title: 'Edit Profile',
  headerLeft: (props) => <LeftChevronButton {...props} tintColor={Colors.greyish3} />,
});

const notificationScreenOptions: GenerateScreenOptionsFunc<SettingsStackParamsList> = () => ({
  ...defaultHeaderBarOptions,
  title: 'Notification',
  headerLeft: (props) => <LeftChevronButton {...props} tintColor={Colors.greyish3} />,
});

const deleteUserScreenOptions: GenerateScreenOptionsFunc<SettingsStackParamsList> = () => ({
  ...defaultHeaderBarOptions,
  title: 'Delete Parlaapp Profile',
  headerLeft: (props) => <LeftChevronButton {...props} tintColor={Colors.greyish3} />,
});

const privacyPolicyScreenOptions: GenerateScreenOptionsFunc<SettingsStackParamsList> = () => ({
  title: 'Privacy Policy',
  ...defaultHeaderBarOptions,
  headerLeft: (props) => <LeftChevronButton {...props} tintColor={Colors.greyish3} />,
});

const incomingCallScreenOptions: GenerateScreenOptionsFunc<CallStackParamsList> = () => ({
  headerShown: false,
});
const currentCallScreenOptions: GenerateScreenOptionsFunc<CallStackParamsList> = () => ({
  headerShown: false,
  // headerLeft: (props) => <LeftChevronButton {...props} />,
  // title: '',
  // headerStyle: {
  //   backgroundColor: Colors.greyish2,
  // },
});

const feedBackCallScreenOptions: GenerateScreenOptionsFunc<CallStackParamsList & RootStackParamList> = ({ navigation }) => ({
  ...defaultHeaderBarOptions,
  headerLeft: () => {
    return <View />;
  },
  // headerRight: () => (
  //   <FlatButton
  //     variant="destructiveOutline1"
  //     title="Report"
  //     titleStyle={{ color: Colors.destructive4, fontSize: fontSize(17) }}
  //     containerStyle={{ minHeight: wp(10) }}
  //     onPress={() => navigation.navigate(CallPages.ReportScreen)}
  //   />
  // ),
  title: 'Call feedback',
});

const matchingScreenOptions: GenerateScreenOptionsFunc<CallStackParamsList & RootStackParamList> = () => ({
  title: 'Matching',
  headerStyle: {
    backgroundColor: Colors.greyish14,
  },
  headerTitleStyle: {
    color: Colors.white,
  },
});

const reportScreenOptions: GenerateScreenOptionsFunc<CallStackParamsList & RootStackParamList> = () => ({
  ...defaultHeaderBarOptions,
  title: 'Report',
  headerLeft: (props) => <LeftChevronButton {...props} tintColor={Colors.greyish3} />,
});

const changeCallScreenOptions: GenerateScreenOptionsFunc<ChangePhoneStackParamsList & RootStackParamList> = ({ navigation }) => ({
  ...defaultHeaderBarOptions,
  title: 'Change phone number',
  headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} tintColor={Colors.greyish3} />,
});

export const settingsOptions = {
  settingsScreenOptions,
  editProfileScreenOptions,
  deleteUserScreenOptions,
  privacyPolicyScreenOptions,
  notificationScreenOptions,
};

export const changePhoneOptions = {
  changeCallScreenOptions,
};

export default {
  homeTabOptions,
  blockTabOptions,
  inviteTabOptions,
  feedbackTabOptions,
  rootTabOptions,
  presetsAvailabilityOptions,
  incomingCallScreenOptions,
  currentCallScreenOptions,
  feedBackCallScreenOptions,
  matchingScreenOptions,
  reportScreenOptions,
  historyTabOptions,
};
