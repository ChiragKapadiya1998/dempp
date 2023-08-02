import React, { FC } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../../../../styles';
import { TabQueries } from '../../types';

import styles from './styles';

const QueriesTab: FC<TabQueries> = ({ tabQueries, onPress, count }) => {
  return (
    <View style={styles.headerContent}>
      <TouchableOpacity
        onPress={() => onPress(1)}
        style={[styles.tabQueriesContent, { backgroundColor: tabQueries == 1 ? Colors.primary4 : Colors.white }]}
      >
        <Text
          style={[styles.tabQueriesText, { color: tabQueries == 1 ? Colors.white : Colors.greyish1, fontWeight: tabQueries === 1 ? '700' : '500' }]}
        >
          My Queries
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress(2)}
        style={[styles.tabQueriesContent, { backgroundColor: tabQueries == 2 ? Colors.primary4 : Colors.white }, styles.receivedContent]}
      >
        <Text
          style={[styles.tabQueriesText, { color: tabQueries == 2 ? Colors.white : Colors.greyish1, fontWeight: tabQueries === 2 ? '700' : '500' }]}
        >
          Received Queries
        </Text>
        {count > 0 && <View style={[styles.receivedCircle, { backgroundColor: tabQueries == 2 ? Colors.white : Colors.accent7 }]} />}
      </TouchableOpacity>
    </View>
  );
};

export default QueriesTab;
