import React from 'react';
import { View, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';

import { useAppDispatch } from '../../../utils/hooks';
import { Colors } from '../../../styles';
import styles from './styles';

const LostConnectionModal = ({ onPreesEndCall, onADDTime, onPreesFeedback }: any) => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback style={{ flex: 1 }}>
        <View style={styles.headeringContent}>
          <View style={styles.container}>
            <Text style={styles.textStyle}>{'Lost connection'}</Text>
          </View>
          <View style={styles.separateContent} />
          <View style={styles.footerContent}>
            <TouchableOpacity style={{ flex: 1 }} onPress={onPreesEndCall}>
              <Text style={[styles.textStyle, { color: Colors.destructive4 }]}>{'End Call'}</Text>
            </TouchableOpacity>
            {/* <View style={styles.separatefooter} />
            <TouchableOpacity style={{ flex: 1 }} onPress={onPreesFeedback}>
              <Text style={[styles.textStyle, { color: Colors.black }]}>{'Give feedback!'}</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LostConnectionModal;
