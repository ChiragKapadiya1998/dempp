import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Text, View, TouchableOpacity } from 'react-native';
import { Colors, Metrics } from '../../../styles';
import { wp } from '../../../styles/metrics';
import SvgIcon from '../SvgIcon';
import styles from './styles';
import Modal from 'react-native-modal';
import NetInfo, { NetInfoState, useNetInfo } from '@react-native-community/netinfo';
import { useAppSelector } from '../../../utils/hooks';
import { store } from '../../../store';
import { actions as netinfoActions } from '../../../ducks/netinfo';
import remoteConfig from '@react-native-firebase/remote-config';

const InternetConnection = () => {
  const isUnavailableToTesting = remoteConfig().getValue('netWorkIssueShow').asBoolean();
  const { isConnected } = useAppSelector((state) => state.netinfo);

  // if (isConnected) return null;
  const netInfo = useNetInfo();

  if (isConnected) return null;

  return (
    <Modal
      backdropColor={Colors.greyish27}
      backdropOpacity={0.4}
      deviceHeight={Metrics.screenHeight}
      isVisible={!isConnected}
      statusBarTranslucent
      style={styles.overlay}
    >
      <View style={styles.mainContainer}>
        <SvgIcon name={'no-connection-icon'} height={wp(26)} color={Colors.white} />

        <Text style={styles.connectionTitle}>{`Connection lost`}</Text>
        <Text style={styles.connectionDesc}>{'Please check the Internet or WiFi\nconnection to continue using\nParlapp '}</Text>
        <TouchableOpacity
          style={styles.footerStyle}
          onPress={() => {
            console.log('refresh button clicked');
            NetInfo.fetch()
              .then((state) => {
                console.log('state.isConnected', state.isConnected);
                store.dispatch(netinfoActions.updateNetinfoStatus(state.isConnected));
              })
              .catch((e) => {
                console.log('e');
              });
          }}
        >
          <SvgIcon name={'refresh_icon'} height={wp(8.5)} color={Colors.primary4} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
export default InternetConnection;
