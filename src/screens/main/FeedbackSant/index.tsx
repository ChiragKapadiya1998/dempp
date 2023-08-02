import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgIcon from '../../../components/common/SvgIcon';
import { CallStackParamsList } from '../../../navigators/types';
import { Colors } from '../../../styles';
import { hp, wp } from '../../../styles/metrics';
import styles from './styles';
import { Pages } from '../../../navigators/Routes';

const FeedbackSant = () => {
  const navigation = useNavigation<NavigationProp<CallStackParamsList>>();
  const { navigate } = useNavigation();

  // const closeModal = () => {
  //   navigation.goBack();
  // };
  setTimeout(() => {
    navigate(Pages.MainStack, {
      screen: Pages.HomeScreen,
      initial: false,
    });
    return true;
  },3000)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'flex-start', marginLeft: wp(2.5), marginTop: hp(1) }}>
        <SvgIcon name={'left-chevron'} height={hp(2.7)} color={Colors.greyish3} />
      </TouchableOpacity> */}
      <View style={styles.wrapper}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../../assets/updatedIcon.png')} style={styles.updatedIconStyle} resizeMode="contain" />
          <Text style={styles.invitesText}>{'Feedback sent!'}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FeedbackSant;
