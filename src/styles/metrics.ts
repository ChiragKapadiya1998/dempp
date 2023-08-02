import { Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;

export const wp = (value: number) => widthPercentageToDP(value);
export const hp = (value: number) => heightPercentageToDP(value);

export const fontSize = (value: number) => RFValue(value, 736);
