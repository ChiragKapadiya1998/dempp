import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Colors, Typography, Metrics } from '../styles';
import { fontSize, hp, wp } from '../styles/metrics';
import { fontFamily } from '../utils/functions';
import { ISIOS } from '../utils/hooks';
import {StatusBar,NativeModules,Dimensions} from 'react-native';
const {StatusBarManager} = NativeModules;
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight ;
console.log('NavBar----',navbarHeight);

const defaultHeaderBarOptions: Pick<
  StackNavigationOptions,
  'headerStyle' | 'headerTintColor' | 'headerTitleStyle' | 'headerTitleAlign' | 'headerBackTitleVisible'
> = {
  headerStyle: {
    backgroundColor: Colors.greyish6,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.greyish7,
  },
  headerTintColor: Colors.black,
  headerTitleStyle: {
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: fontFamily.rf_medium,
    fontSize: Metrics.fontSize(17),
    lineHeight: Metrics.fontSize(22),
    letterSpacing: -0.41,
    color: Colors.accent19,
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
};

export const defaultTabHeaderOptions: Pick<
  BottomTabNavigationOptions,
  'headerStyle' | 'headerTintColor' | 'headerTitleStyle' | 'headerTitleAlign' | 'headerLeftLabelVisible' | 'tabBarStyle'
> = {
  headerStyle: {
    backgroundColor: Colors.secondary17,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.secondary16,
  },
  headerTintColor: Colors.accent19,
  headerTitleStyle: {
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: fontFamily.rf_regular,
    fontSize: fontSize(10),
    // lineHeight: fontSize(11.5),
    letterSpacing: -0.3,
    // marginVertical:7,
    marginTop:16,
    // margin:0
    // height: wp(10),
    marginBottom: ISIOS ? -6 : -1,
  },
  headerTitleAlign: 'center',
  headerLeftLabelVisible: false,
  
  tabBarStyle: {
    backgroundColor:Colors.secondary17,
    borderTopColor: Colors.secondary16,
    paddingTop: 16,
    // paddingTop: 9.5,
    // borderBottomWidth:1,
    // height:ISIOS ? hp(12.4): hp(13.0),
    // justifyContent: 'flex-end',
    // alignItems:'flex-end',
  
  },
};

export default defaultHeaderBarOptions;
