import { StackNavigationProp } from '@react-navigation/stack';
import { Pages } from '../../../navigators/Routes';
import { AuthStackParamList } from '../../../navigators/types';

export type ScreenNavigationProps = StackNavigationProp<
  AuthStackParamList,
  Pages.SignUpPhoneScreen
>;

export type FormData = {
  phoneNumber: string;
};
