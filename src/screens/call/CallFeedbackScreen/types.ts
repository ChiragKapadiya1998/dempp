import { RouteProp } from '@react-navigation/native';
import { CallStackParamsList } from '../../../navigators/types';
import { CallPages } from '../../../navigators/Routes';

export type ScreenRouteProp = RouteProp<
  CallStackParamsList,
  CallPages.CallFeedbackScreen
>;
