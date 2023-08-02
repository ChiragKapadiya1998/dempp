import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSelector } from 'react-redux';
import { BottomTabs } from '../../../navigators/Routes';
import { Colors } from '../../../styles';
import { hp, wp } from '../../../styles/metrics';
import { IOS } from '../../../utils/constants';
import { ISIOS } from '../../../utils/hooks';
import NavigationHelper from '../../../utils/NavigationHelper';
import BottomTabItem from './BottmTabItem';

function BottomTabView({ props }) {
  const { bottom } = useSafeAreaInsets();

  const isActive = (index) => {
    return index === props?.state?.index;
  };

  const onPressHome = () => {
    NavigationHelper.navigate(BottomTabs.HomeBottomTab);
  };
  const onPressHistory = () => {
    NavigationHelper.navigate(BottomTabs.HistoryScreen);
  };
  const onPressInvite = () => {
    NavigationHelper.navigate(BottomTabs.InviteBottomTab);
  };

  return (
    <SafeAreaView style={[styles.mainContainer, { paddingBottom: ISIOS ? 0 : bottom }]}>
      <BottomTabItem icons={'home-tab-icon'} title={'Home'} onPress={onPressHome} isActive={isActive(0)} />
      <BottomTabItem icons={'history-tab-icon'} title={'History'} onPress={onPressHistory} isActive={isActive(1)} showValue={true} />
      <BottomTabItem icons={'invite-tab-icon'} title={'Invite'} onPress={onPressInvite} isActive={isActive(2)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: wp(0.3),
    borderBottomWidth: 0,
    flexDirection: 'row',
    borderColor: '#DEE1E6',
    justifyContent: 'space-around',
    backgroundColor: '#F9F9F9',
  },
});

export default BottomTabView;
