import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import ImagePicker, { Options } from 'react-native-image-crop-picker';
import { useEffect, useState } from 'react';
import { BackHandler, Keyboard, Platform } from 'react-native';
import { store, StoreState } from '../store';
import PermissionHelper from './PermissionHelper';
import Slack from 'react-native-slack-webhook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_NAME } from './constants';
import remoteConfig from '@react-native-firebase/remote-config';

type AppDispatch = typeof store.dispatch;

export const ISIOS = Platform.OS === 'ios';
/** Dispatch */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Selector */
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

/** Back handler hook */
export const useBackHandler = (backAction: () => boolean | null | undefined) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [backAction]);
};

/** Image picker hook */
export const useImagePicker = (callback: (path: string) => void, options: Options) => {
  // Take a photo
  const onOpenCamera = async () => {
    try {
      const isPermissionGranted = await PermissionHelper.checkCameraPermission();

      if (!isPermissionGranted) return;

      const { path } = await ImagePicker.openCamera(options);

      callback(path);
      // eslint-disable-next-line no-empty
    } catch {}
  };

  // Select a photo from the photo library
  const onOpenLibrary = async () => {
    try {
      const isPermissionGranted = await PermissionHelper.checkPhotoLibraryPermission();

      if (!isPermissionGranted) return;

      const { path } = await ImagePicker.openPicker(options);

      callback(path);
      // eslint-disable-next-line no-empty
    } catch {}
  };

  return {
    onOpenCamera,
    onOpenLibrary,
  };
};

/** Keyboard */
export const useKeyboard = () => {
  const [keyboardConfig, setIsKeyboardShown] = useState<{ isKeyboardHows: boolean; keyboardHeight: number; keyboardDuration: number }>({
    isKeyboardHows: false,
    keyboardHeight: 0,
    keyboardDuration: 300,
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
        setIsKeyboardShown({
          isKeyboardHows: true,
          keyboardHeight: e.endCoordinates.height,
          keyboardDuration: e.duration,
        });
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', (e) => {
        setIsKeyboardShown({
          isKeyboardHows: false,
          keyboardHeight: 0,
          keyboardDuration: e.duration,
        });
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    } else if (Platform.OS === 'ios') {
      const showSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
        setIsKeyboardShown({
          isKeyboardHows: true,
          keyboardHeight: e.endCoordinates.height,
          keyboardDuration: e.duration,
        });
      });
      const hideSubscription = Keyboard.addListener('keyboardWillHide', (e) => {
        setIsKeyboardShown({
          isKeyboardHows: false,
          keyboardHeight: 0,
          keyboardDuration: e.duration,
        });
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, []);

  return keyboardConfig;
};

export function objToString(obj: any) {
  var str = '';
  for (var p in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str += `*${p}*` + '     ==>     ' + obj[p] + '\n';
    }
  }
  return str;
}

//Slack
export const getSendSlack = async (data: any) => {
  const prolongationStep = remoteConfig().getValue('isSlackLogging').asBoolean();

  const value = await AsyncStorage.getItem(USER_NAME);

  let str = objToString(data.data);
  let finalStr = `*${data.title} (UserName :: ${value}) *\n${str}\n-----------------------------------`;

  new Slack('https://hooks.slack.com/services/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').post(finalStr, '#mobile-apps');
  // new Slack('https://hooks.slack.com/services/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').post(finalStr, '#demo');
};

//Slack
export const getSendSlack12 = async (data: any) => {
  const prolongationStep = remoteConfig().getValue('isSlackLogging').asBoolean();

  const value = await AsyncStorage.getItem(USER_NAME);

  let str = objToString(data.data);
  let finalStr = `*${data.title} (UserName :: ${value}) *\n${str}\n-----------------------------------`;

  // new Slack('https://hooks.slack.com/services/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').post(finalStr, '#mobile-apps');
  // new Slack('https://hooks.slack.com/services/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').post(finalStr, '#demo');
};
