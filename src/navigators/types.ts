import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { BottomTabs, Pages, SettingsStackPages, CallPages, ChangePhonePages } from './Routes';

export type RootStackParamList = {
  [Pages.AuthStack]: { screen: Pages } | undefined;
  [Pages.MainStack]: { screen: Pages | BottomTabs } | undefined;
  [Pages.SetUpProfileStack]: undefined;
  [Pages.OnboardingScreen]: undefined;
  [Pages.CallStack]: { screen: CallPages } | undefined;
};
export type RootStackParamListParams = {
  [Pages.AuthStack]: { screen: Pages } | undefined;
  [Pages.MainStack]: { screen: Pages } | undefined;
  [Pages.SetUpProfileStack]: undefined;
  [Pages.OnboardingScreen]: undefined;
  [Pages.CallStack]: { screen: CallPages; params: any } | undefined;
};

export type AuthStackParamList = {
  [Pages.SignUpPhoneScreen]: undefined;
  [Pages.SignUpCodeScreen]: { phoneNumber: string };
  [Pages.SignUpCredentialsScreen]: { phoneNumber: string; code: string };
  [Pages.LogInUsernameScreen]: undefined;
  [Pages.LogInCodeScreen]: {
    username: string;
  };
  [Pages.PasswordResetPhoneScreen]: undefined;
  [Pages.PasswordResetCodeScreen]: { phoneNumber: string };
  [Pages.PasswordResetCredentialsScreen]: {
    phoneNumber: string;
    code: string;
  };
  [Pages.TermsConditionsScreen]: undefined;
  [Pages.CongratsScreen]: undefined;
};

export type MainStackParamList = {
  [Pages.HomeScreen]: undefined;
  [Pages.PresetsAvailability]: undefined;
  [Pages.PresetsMenu]: undefined;
  [Pages.SettingStack]: undefined;
  [Pages.ContactsScreen]: undefined;
  [Pages.InvitesSantContacts]: undefined;
  [Pages.FeedbackSant]: undefined;
  [Pages.BlockedScreen]: undefined;
};

export type SetUpProfileStackParamList = {
  [Pages.SetUpProfileGeneralInfoScreen]: undefined;
  [Pages.SettingUpUserName]: undefined;
  [Pages.OnboardingSettingUp]: undefined;
  [Pages.SetUpProfilePassionsScreen]: {
    username: string;
    fullName: string;
    tagline: string;
    profileImage?: string;
    profileAudio: string;
    profileAudioDuration: number; // sec
  };
};

export type BottomStackParamsList = {
  [BottomTabs.HomeBottomTab]: undefined;
  [BottomTabs.InviteBottomTab]: undefined;
  [BottomTabs.BlockedScreen]: undefined;
  [BottomTabs.HistoryScreen]: undefined;
};

export type CallStackParamsList = {
  [CallPages.IncommingCallScreen]: undefined;
  [CallPages.CurrentCallScreen]: undefined;
  [CallPages.CallFeedbackScreen]: undefined;
  [CallPages.MatchingScreen]: undefined;
  [CallPages.ReportScreen]: undefined;
  [CallPages.InviteToRoomScreen]: undefined;
  [CallPages.ConnectionCallScreen]: undefined;
};

export type ChangePhoneStackParamsList = {
  [ChangePhonePages.ChangePhoneScreen]: undefined;
  [ChangePhonePages.ConfirmChangesScreen]: undefined;
};

export type SettingsStackParamsList = {
  [SettingsStackPages.SettingsScreen]: undefined;
  [SettingsStackPages.EditProfileScreen]: undefined;
  [SettingsStackPages.DeleteUserScreen]: undefined;
  [SettingsStackPages.DeleteUserFeedScreen]: undefined;
  [SettingsStackPages.DeleteFeedbackScreen]: undefined;
  [SettingsStackPages.PrivacyPolicyScreen]: undefined;
  [SettingsStackPages.TermsScreen]: undefined;
  [SettingsStackPages.ChangePhoneStack]: { screen: ChangePhonePages } | undefined;
  [SettingsStackPages.FeedbackScreen]: undefined;
  [SettingsStackPages.NotificationScreen]: undefined;
  [SettingsStackPages.NotificationSoundScreen]: undefined;
  [SettingsStackPages.HelpScreen]: undefined;
  [SettingsStackPages.EditKhowHowsScreen]: undefined;
};

export type GenerateTabOptionsFunc<T extends ParamListBase> = (props: {
  route: RouteProp<T, keyof T>;
  navigation: NavigationProp<T, keyof T>;
}) => BottomTabNavigationOptions;

export type GenerateScreenOptionsFunc<T extends ParamListBase> = (props: {
  route: RouteProp<T, keyof T>;
  navigation: NavigationProp<T, keyof T>;
}) => StackNavigationOptions;
