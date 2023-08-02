import { RouteProp } from '@react-navigation/native';
import { Pages } from '../../../navigators/Routes';
import { SetUpProfileStackParamList } from '../../../navigators/types';

export type Passion = {
  name: string;
  id?: string;
  isSelected: boolean;
};

export type Category = {
  name: string;
  id: string;
  passions: Passion[];
  numberOfPassionsShown: number;
};

export type ScreenRouteProp = RouteProp<
  SetUpProfileStackParamList,
  Pages.SetUpProfilePassionsScreen
>;
