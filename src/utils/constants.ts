import { Easing, Platform } from 'react-native';
import { wp } from '../styles/metrics';

export const ENABLED = 'enabled';
export const ANDROID = 'android';
export const HORIZONTAL_MARGIN = wp(3.85);
export const AUTH_HORIZONTAL_SPACE = wp(7.7);
export const MAX_LENGTH_TEXT_INPUT = 50;
export const POST = 'POST';
export const GET = 'GET';
export const REQUEST_TIMEOUT = 4000;
export const SIGNAL = 'signal';
export const ROOT = 'root';
export const ERRORS = 'errors';
export const AUTH = 'auth';
export const TOKEN = 'token';
export const ACCESSTOKEM = 'accessToken';
export const USER_NAME = 'userName';
export const CALL_END = 'callEnd';
export const CALL_END_NAVIGATION = 'callEndNavigation';
export const END_CALL_HISTORY = 'callEndHistory';
export const END_CALL_NOT_SHOW_CLOSESCREEN = 'callEndConnectionRoom';
export const END_CALL_NOT_RECEIVER_SCREEN = 'ReceiverCallRoomEnd';
export const NOT_SHOW_MATCHING_SCREEN = 'MatchingNotShowCallRoom';
export const MAX_DURATION_AUDIO_RECORD = 60000; // ms
export const IOS = 'ios';
export const COMPRESS_IMAGE_MAX_WIDTH = 1080;
export const COMPRESS_IMAGE_MAX_HEIGHT = 1080;
export const USER = 'user';
export const PASSIONS = 'passions';
export const INITIAL = 'initial';
export const HISTORY = 'history';
export const INVITE = 'invite';
export const NETINFO = 'netinfo';
export const PASSIONS_PAGE_SIZE = 3;
export const PATCH = 'PATCH';
export const ANDROID_AUDIO_MIME = 'audio/mp4';
export const IOS_AUDIO_MIME = 'audio/x-m4a';
export const PHOTO = 'photo';
export const DISTURB = 'disturb';
export const FCM = 'fcm';
export const MODALS = 'modals';
export const MIN_NUM_PASSIONS_PROFILE_SETUP = 5;
export const FEEDBACK = 'feedback';
export const CANDIDATES = 'candidates';
export const PHONE = 'phone';
export const CONTACTS = 'contacts';
export const DELETE_USER_CONFIRMATION_TEXT = 'delete';
export const VALIDATION_CODE_LENGTH = 6;
export const ICON_HIT_SLOP = { top: 16, bottom: 16, right: 16, left: 16 };
export const POST_CANCEL_CALL_TIMEOUT = 10000; // ms
export const CALLS = 'calls';
export const PUSH = 'push';
export const SMALL_PRELOADER_SIZE = 24;
export const KEYBOARD_ANIMATION_REPRODUCE = Easing.bezier(0.1, 0.76, 0.55, 0.9);
export const PARLA_SUPPORT_EMAIL = 'support@parla.com';
export const IS_IOS = Platform.OS === IOS;

export const soundFileTypes = {
  sound1: 'water_5',
  sound2: 'kindersurprise_6s',
  sound3: 'analog_lab_sinus_8_2',
  sound4: 'analog_lab_dream_8_5',
};
