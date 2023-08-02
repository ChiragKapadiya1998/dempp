import { StyleProp, ViewStyle } from 'react-native';

export type SvgIconName =
  | 'parla-text'
  | 'parlapp-text-logo'
  | 'alert'
  | 'checkbox-marked'
  | 'checkbox-blank-outline'
  | 'left-chevron'
  | 'camera'
  | 'volume-high'
  | 'volume-off'
  | 'play'
  | 'pause'
  | 'stop'
  | 'feedback-tab-icon'
  | 'home-tab-icon'
  | 'invite-tab-icon'
  | 'setting-tab-icon'
  | 'search-icon'
  | 'microphone-icon'
  | 'microphone-muted-icon'
  | 'onboarding-step-1'
  | 'onboarding-step-2'
  | 'onboarding-step-3'
  | 'star'
  | 'star-outline'
  | 'parla-onion'
  | 'spa'
  | 'spa-colorless'
  | 'parla-push-icon'
  | 'white-logo'
  | 'phone'
  | 'right-small-chevron'
  | 'pencil'
  | 'done'
  | 'chevron-up'
  | 'chevron-down'
  | 'thank-you'
  | 'time-presets-icon'
  | 'parlapp-logo'
  | 'parlapp-text'
  | 'feedback-survey'
  | 'feedback-tagline'
  | 'profile-icon'
  | 'notification-icon'
  | 'download-icon'
  | 'call-icon'
  | 'paper-icon'
  | 'shield-done-icon'
  | 'login-icon'
  | 'congrats-icon'
  | 'settings-icon'
  | 'no-connection-icon'
  | 'feedback-option-icon'
  | 'invite-tagline'
  | 'illustration'
  | 'grow-icon'
  | 'blockedIllustration'
  | 'notificationSound'
  | 'inviting-spinner-icon'
  | 'history-tab-icon'
  | 'dropDownArrow'
  | 'right-icon'
  | 'call-missed-icon'
  | 'union-icon'
  | 'call-declined-icon'
  | 'call-answered-icon'
  | 'cancel-icon'
  | 'helpIcon'
  | 'welcome-community-icon'
  | 'right-arrow-icon'
  | 'add-photo-icon'
  | 'plus-icon'
  | 'uploadImg-icon'
  | 'question-icon'
  | 'use-search-icon'
  | 'use-search-match-icon'
  | 'inviting-spinner-disabled'
  | 'lostconnection-icon'
  | 'opps-icon'
  | 'setUp-notification-icon'
  | 'chatty-icon'
  | 'do-not-disturb-icon'
  | 'call-normal-icon'
  | 'dots-icon'
  | 'plusbg-icon'
  | 'minusbg-icon'
  | 'lineBorder-icon'
  | 'volume-record'
  | 'deleteprofile-icon'
  | 'call-missed-icon-close'
  | 'avtar-photo-icon'
  | 'refresh_icon'
  | 'round-right-icon'
  | 'callEnd';

export type Props = {
  name: SvgIconName;
  height: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export type ContentProps = {
  color: string;
};

export type SvgIcon = {
  name: SvgIconName;
  baseHeight: number;
  baseWidth: number;
  Content: (props: ContentProps) => JSX.Element;
};

export type SvgIconCollection = {
  [K in SvgIconName]: SvgIcon;
};
