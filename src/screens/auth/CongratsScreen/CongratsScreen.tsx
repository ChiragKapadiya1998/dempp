import React from 'react';
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../../../components/forms/FlatButton';
import SvgIcon from '../../../components/common/SvgIcon';
import { ScreenNavigationProps } from './types';
import { fontSize, hp } from '../../../styles/metrics';
import { Container, TitleText, DescriptionText } from './styled';
import styles from './styles';
import NavigationHelper from '../../../utils/NavigationHelper';
import { Pages } from '../../../navigators/Routes';
import { SafeAreaView, View } from 'react-native';
import { fontFamily } from '../../../utils/functions';

const CongratsScreen = (): JSX.Element => {
  // const { navigation } = useNavigation<ScreenNavigationProps>();
  const { navigate } = useNavigation();

  return (
    <Container>
      <SafeAreaView style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <TitleText style={{ fontWeight: '600', fontFamily: fontFamily.rf_semibold, letterSpacing: -0.02, lineHeight: fontSize(38) }}>
          {'Your new account was successfully set up!'}
        </TitleText>
        <SvgIcon name={'congrats-icon'} height={hp(23)} />
        <DescriptionText style={{ fontWeight: '400', fontFamily: fontFamily.rf_regular, letterSpacing: -0.02, lineHeight: fontSize(22) }}>
          {'Are you ready to start the journey in\nthe community of knowledge sharers?'}
        </DescriptionText>
      </SafeAreaView>
      <FlatButton
        title={'Yey start'}
        onPress={() => {
          NavigationHelper.goToHomeScreen();
        }}
        variant={'solid1'}
        disabled={false}
        loading={false}
        containerStyle={styles.startButton}
      />
      <SafeAreaView />
    </Container>
  );
};

export default CongratsScreen;
