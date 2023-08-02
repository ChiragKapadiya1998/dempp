import { Alert } from 'react-native';

export default (title: string, msg: string): void => {
  Alert.alert(title, msg, [{ text: 'OK' }]);
};
