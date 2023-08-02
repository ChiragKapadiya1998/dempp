import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SvgIcon from '../../../components/common/SvgIcon';
import { SettingsStackPages } from '../../../navigators/Routes';
import { SettingsStackParamsList } from '../../../navigators/types';
import { Colors } from '../../../styles';
import { hp } from '../../../styles/metrics';
import styles from './styles';

const DeleteUserFeedScreen = () => {
  const navigation = useNavigation<NavigationProp<SettingsStackParamsList>>();

  return (
    <View style={styles.screen}>
      <SvgIcon name="illustration" height={185} color={Colors.secondary7} style={{ marginBottom: hp(6) }} />
      <Text style={styles.headerText}>{'Your profile was deleted'}</Text>
      <Text style={styles.headerSubText}>
        {'We are sad you left us. Please, let us know\nwhat was wrong. Your feedback will help\nus to become better.'}
      </Text>
      <TouchableOpacity style={styles.deleteMainContent} onPress={() => navigation.navigate(SettingsStackPages.DeleteFeedbackScreen)}>
        <Text style={styles.deleteText}>{'Give a feedback'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteUserFeedScreen;
