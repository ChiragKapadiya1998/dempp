import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { ANDROID, IOS } from './constants';
import showAlert from './showAlert';

export default class PermissionHelper {
  /** Check microphone permission on android */
  private static async checkMicrophonePermissionAndroid() {
    let result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (result === RESULTS.DENIED) {
      result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    } else if (result === RESULTS.BLOCKED) {
      // TODO: replace alert into snackbar or toast
      showAlert('Microphone', 'Please unblock a microphone');
    }

    return result === RESULTS.GRANTED;
  }

  /** Check microphone permission on iOS */
  private static async checkMicrophonePermissionIOS() {
    let result = await check(PERMISSIONS.IOS.MICROPHONE);
    if (result === RESULTS.DENIED) {
      result = await request(PERMISSIONS.IOS.MICROPHONE);
    } else if (result === RESULTS.BLOCKED) {
      // TODO: replace alert into snackbar or toast
      showAlert('Microphone', 'Please unblock a microphone');
    }

    return result === RESULTS.GRANTED;
  }

  /** Check write storage permission on android */
  private static async checkWriteStoragePermissionAndroid() {
    let result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (result === RESULTS.DENIED) {
      result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    } else if (result === RESULTS.BLOCKED) {
      // TODO: replace alert into snackbar or toast
      showAlert('Storage', 'Please unblock a storage');
    }

    return result === RESULTS.GRANTED;
  }

  /** Check read storage permission on android */
  private static async checkReadStoragePermissionAndroid() {
    let result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (result === RESULTS.DENIED) {
      result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    } else if (result === RESULTS.BLOCKED) {
      // TODO: replace alert into snackbar or toast
      showAlert('Storage', 'Please unblock a storage');
    }

    return result === RESULTS.GRANTED;
  }

  /** Check permissions to record and play audio on all platforms */
  static async checkAudioPermissions() {
    if (Platform.OS === ANDROID) {
      const microphonePermission =
        await this.checkMicrophonePermissionAndroid();
      const writeStoragePermission =
        await this.checkWriteStoragePermissionAndroid();
      const readStoragePermission =
        await this.checkReadStoragePermissionAndroid();

      return (
        microphonePermission && writeStoragePermission && readStoragePermission
      );
    }

    // iOS case
    const isGranted = await this.checkMicrophonePermissionIOS();
    return isGranted;
  }

  /** Check camera permission on android */
  private static async checkCameraPermissionAndroid() {
    let result = await check(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.DENIED) {
      result = await request(PERMISSIONS.ANDROID.CAMERA);
    } else if (result === RESULTS.BLOCKED) {
      // TODO: replace alert into snackbar or toast
      showAlert('Camera', 'Please unblock a camera');
    }

    return result === RESULTS.GRANTED;
  }

  /** Check camera permission on iOS */
  private static async checkCameraPermissionIOS() {
    let result = await check(PERMISSIONS.IOS.CAMERA);
    if (result === RESULTS.DENIED) {
      result = await request(PERMISSIONS.IOS.CAMERA);
    } else if (result === RESULTS.BLOCKED) {
      // TODO: replace alert into snackbar or toast
      showAlert('Camera', 'Please unblock a camera');
    }

    return result === RESULTS.GRANTED;
  }

  /** Check camera permission on all platforms */
  static async checkCameraPermission() {
    if (Platform.OS === ANDROID) {
      const isGranted = await this.checkCameraPermissionAndroid();
      return isGranted;
    }

    // iOS case
    const isGranted = await this.checkCameraPermissionIOS();
    return isGranted;
  }

  /** Check photo library permission on iOS */
  private static async checkPhotoLibraryPermissionIOS() {
    let result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (result === RESULTS.DENIED) {
      result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    } else if (result === RESULTS.BLOCKED) {
      // TODO: replace alert into snackbar or toast
      showAlert('Camera', 'Please unblock a photo library');
    }

    return [result === RESULTS.GRANTED, result === RESULTS.LIMITED].includes(
      true,
    );
  }

  /** Check photo library permission on all platfroms */
  static async checkPhotoLibraryPermission() {
    if (Platform.OS === IOS) {
      const isGranted = await this.checkPhotoLibraryPermissionIOS();
      return isGranted;
    }

    return true;
  }
}
