import React from 'react';
import { ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './styles';
import { Colors, Metrics } from '../../../styles';
import { source } from './data';
import { tagsStyles } from '../../../utils/htmlStyles';

const PrivacyPolicyScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom }]}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
    >
      <RenderHtml contentWidth={Metrics.screenWidth} source={source} tagsStyles={tagsStyles} />
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;
