import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { useAppSelector } from '../../../utils/hooks';

import SvgIcon from '../SvgIcon';
import styles from './styles';
import { tabIconProps } from './types';

const TabIconBtn: FC<tabIconProps> = ({ color }) => {
  const { count } = useAppSelector((state) => state.history);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <SvgIcon name="history-tab-icon" height={24} color={color !== '#848FA1' ? '#2454FF' : color} />
      {count > 0 && (
        <View style={styles.bodyContentInner}>
          <View style={styles.bodyContent}>
            <Text style={styles.bodyText}>{count}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default TabIconBtn;
