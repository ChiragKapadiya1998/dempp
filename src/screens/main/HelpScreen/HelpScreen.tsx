import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import TitleSmall from '../../../components/common/TitleSmall';
import { GeneralquestionsData, SettingsquestionsData, SetupquestionsData } from '../../../utils/reportReasons';

import styles from './styles';
import { hp } from '../../../styles/metrics';
import LinkItemRender from './components/LinkItemRender';

const HelpScreen = () => {
  const dispatch = useAppDispatch();
  const { helpData } = useAppSelector((state) => state.feedback);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} bounces={false}>
      {helpData.map((item) => {
        const final = item?.QAs?.length;
        return (
          <>
            <TitleSmall style={styles.title}>{item?.topic}</TitleSmall>
            <View style={styles.listContainer}>
              {item?.QAs?.map((item, index) => (
                <LinkItemRender data={item} hideDividerline={index + 1 == final} />
              ))}
            </View>
          </>
        );
      })}

      {/* <TitleSmall style={[styles.title, { marginTop: hp(2.1) }]}>Settings questions</TitleSmall>
      <View style={styles.listContainer}>
        {GeneralquestionsData.map((item, index) => (
          <LinkItemRender data={item} hideDividerline={index + 1 == GeneralquestionsData.length} />
        ))}
      </View> */}

      <Text style={styles.versionText}>
        {`Still have questions?\n Contact us at `}
        <Text style={styles.versionTextSub}>{'support@parlapp.com'}</Text>
      </Text>
    </ScrollView>
  );
};

export default HelpScreen;
