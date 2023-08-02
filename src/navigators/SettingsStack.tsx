import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DeleteUserScreen from '../screens/settings/DeleteUserScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import TermsConditionsScreen from '../screens/auth/TermsConditionsScreen';
import PrivacyPolicyScreen from '../screens/settings/PrivacyPolicyScreen';
import EditProfileScreen from '../screens/settings/EditProfileScreen';
import FeedbackScreen from '../screens/main/FeedbackScreen';
import NotificationScreen from '../screens/main/NotificationScreen';

import LeftChevronButton from '../components/common/Header/components/LeftChevronButton';
import defaultHeaderBarOptions from './defaultHeaderOptions';
import { SettingsStackPages } from './Routes';
import { SettingsStackParamsList } from './types';
import { settingsOptions } from './options';
import ChangePhoneStack from './ChangePhoneStack';
import NotificationSoundScreen from '../screens/main/NotificationSoundScreen';
import AvatarIconButton from '../components/common/AvatarIconButton';
import HelpScreen from '../screens/main/HelpScreen';
import DeleteUserFeedScreen from '../screens/settings/DeleteUserFeedScreen';
import DeleteFeedbackScreen from '../screens/settings/DeleteFeedbackScreen';
import { Colors } from '../styles';
import EditKhowHowsScreen from '../screens/settings/EditKhowHowsScreen';

const Stack = createStackNavigator<SettingsStackParamsList>();

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={SettingsStackPages.SettingsScreen} component={SettingsScreen} options={settingsOptions.settingsScreenOptions} />
    <Stack.Screen
      name={SettingsStackPages.EditProfileScreen}
      component={EditProfileScreen}
      options={({ navigation }) => ({
        ...defaultHeaderBarOptions,
        title: 'Edit Profile',
        headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} tintColor={Colors.greyish3} />,
      })}
    />
    <Stack.Screen
      name={SettingsStackPages.EditKhowHowsScreen}
      component={EditKhowHowsScreen}
      options={({ navigation }) => ({
        ...defaultHeaderBarOptions,
        title: 'Edit Profile',
        headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} tintColor={Colors.greyish3} />,
      })}
    />
    <Stack.Screen
      name={SettingsStackPages.NotificationScreen}
      component={NotificationScreen}
      options={({ navigation }) => ({
        ...defaultHeaderBarOptions,
        title: 'Notification',
        headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} tintColor={Colors.greyish3} />,
      })}
    />
    <Stack.Screen
      name={SettingsStackPages.NotificationSoundScreen}
      component={NotificationSoundScreen}
      options={({ navigation }) => ({
        ...defaultHeaderBarOptions,
        title: 'Notification Sound',
        headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} tintColor={Colors.greyish3} />,
      })}
    />
    <Stack.Screen
      name={SettingsStackPages.DeleteUserScreen}
      component={DeleteUserScreen}
      options={({ navigation }) => ({
        ...defaultHeaderBarOptions,
        title: 'Delete Parlapp Profile',
        headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} tintColor={Colors.greyish3} />,
      })}
    />
    <Stack.Screen
      name={SettingsStackPages.TermsScreen}
      component={TermsConditionsScreen}
      options={({ navigation }) => ({
        ...defaultHeaderBarOptions,
        title: 'Terms and Conditions',
        headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} tintColor={Colors.greyish3} />,
      })}
    />
    <Stack.Screen
      name={SettingsStackPages.PrivacyPolicyScreen}
      component={PrivacyPolicyScreen}
      options={({ navigation }) => ({
        ...defaultHeaderBarOptions,
        title: 'Privacy policy',
        headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} tintColor={Colors.greyish3} />,
      })}
    />
    <Stack.Screen name={SettingsStackPages.ChangePhoneStack} component={ChangePhoneStack} options={{ headerShown: false }} />
    <Stack.Screen
      name={SettingsStackPages.FeedbackScreen}
      component={FeedbackScreen}
      options={({ navigation }) => ({
        ...defaultHeaderBarOptions,
        title: 'Feedback',
        headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} tintColor={Colors.greyish3} />,
      })}
    />
    <Stack.Screen
      name={SettingsStackPages.HelpScreen}
      component={HelpScreen}
      options={({ navigation }) => ({
        ...defaultHeaderBarOptions,
        title: 'Help',
        headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} tintColor={Colors.greyish3} />,
      })}
    />
    <Stack.Screen name={SettingsStackPages.DeleteUserFeedScreen} component={DeleteUserFeedScreen} options={{ headerShown: false }} />
    <Stack.Screen name={SettingsStackPages.DeleteFeedbackScreen} component={DeleteFeedbackScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default SettingsStack;
