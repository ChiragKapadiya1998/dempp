import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RenderHtml from 'react-native-render-html';

import styles from './styles';
import { Colors, Metrics } from '../../../styles';
import { tagsStyles } from '../../../utils/htmlStyles';
import { source } from './data';

const TermsConditionsScreen = (): JSX.Element => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom }]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <RenderHtml contentWidth={Metrics.screenWidth} source={source} tagsStyles={tagsStyles} />
    </KeyboardAwareScrollView>
  );
};

export default TermsConditionsScreen;
