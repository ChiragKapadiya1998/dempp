import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-native-modal';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// import AnimatedLottieView from 'lottie-react-native';
import LottieView from 'lottie-react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedLottieView from 'lottie-react-native';
import styles from './styles';
import { Colors, Metrics } from '../../../../../styles';
import SvgIcon from '../../../../../components/common/SvgIcon';
import { appInfoData, appInfoDataDummy } from '../../../../../utils/reportReasons';
import { hp, wp } from '../../../../../styles/metrics';
import { final, slider, tutorial } from '../../../../../utils/lottieSources';
import { ISIOS } from '../../../../../utils/hooks';

const HelpUseModal = ({ tabQueries, isVisibleModal, setIsVisibleModal, selectData }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearch, setIsSearch] = useState(true);
  const lottieRef = useRef<AnimatedLottieView | null>(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
      }, 100);
    }
  }, [lottieRef.current]);

  const closeModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };
  const onPressGotIt = () => {
    // if (activeIndex < 2) {
    //   setActiveIndex((pre) => pre + 1);
    // } else {
    closeModal();
    // }
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationInTiming={1}
      animationOut="fadeOut"
      animationOutTiming={50}
      backdropColor="rgba(195, 205, 219, 1)"
      backdropOpacity={0.8}
      backdropTransitionOutTiming={0}
      isVisible={isVisibleModal}
      statusBarTranslucent
      style={styles.overlay}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
    >
      <View style={[styles.main, { marginBottom: ISIOS ? 0 : insets.bottom }]}>
        <View style={styles.bottomAlert}>
          <Text style={[styles.bottomAlertText, { color: Colors.greyish1 }]}>{` How to use Parlapp`}</Text>
          {/* {appInfoData.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.dotContent,
                  {
                    backgroundColor: index == activeIndex ? item.color : Colors.primary4,
                    width: index == activeIndex ? wp(7.2) : wp(2.5),
                  },
                ]}
              />
            );
          })} */}
          <LottieView ref={lottieRef} loop speed={1} source={slider} autoPlay style={{ height: hp(1.5), alignSelf: 'flex-end' }} />
        </View>
        {/* {activeIndex == 0 || activeIndex == 1 ? (
          <>
            <View style={styles.inputContent}>
              <SvgIcon name={'search-icon'} height={hp(2)} color={Colors.primary5} />
              <TextInput
                editable={false}
                placeholder="How to cook Madeira traditional pie"
                style={styles.textInput}
                placeholderTextColor={Colors.primary2}
              />
            </View>
            <View style={styles.addContent}>
              {appInfoDataDummy.map((item, index) => {
                if (activeIndex == 0 && index == 4) {
                  return;
                }
                return (
                  <View
                    style={[
                      styles.addContentCard,
                      {
                        borderWidth: index == 0 ? 0 : index == 3 ? 0 : 1,
                        borderColor: index == 0 ? 'transparent' : index == 3 ? 'transparent' : index == 4 ? Colors.greyish23 : Colors.accent17,
                        backgroundColor:
                          index == 0 ? Colors.secondary9 : index == 3 ? Colors.secondary10 : index == 4 ? Colors.greyish22 : Colors.white,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.addContentCardText, { color: index == 0 ? Colors.accent15 : index == 3 ? Colors.accent16 : Colors.greyish23 }]}
                    >
                      {item.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </>
        ) : isSearch ? (
          <TouchableOpacity style={styles.serachContent} onPress={() => setIsSearch(false)}>
            <Text style={styles.serachContentText}>Search</Text>
            <View style={styles.serachContentIcon}>
              <SvgIcon name={'use-search-icon'} height={hp(5)} color={Colors.primary5} />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.serachIcon}>
            <SvgIcon name={'use-search-match-icon'} height={hp(21)} color={Colors.primary5} />
          </View>
        )}
        <Text style={[styles.footerText, { marginTop: activeIndex == 0 ? hp(10) : activeIndex == 1 ? hp(2.8) : 0 }]}>
          {activeIndex == 0
            ? 'Write topic you want to know about and\n choose related tags'
            : activeIndex == 1
            ? 'Can’t find related tags? No problem.\n Just add yours'
            : 'Now press the “search” button and wait till\n somebody will answer. It can take some time '}
        </Text> */}

        <View style={{ flex: 1, marginTop: hp(-4) }}>
          <LottieView source={tutorial} autoPlay loop style={{ height: hp(40) }} />
        </View>
        <TouchableOpacity style={styles.gotBtn} onPress={onPressGotIt}>
          <Text style={[styles.gotBtnText]}>Got it!</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default HelpUseModal;
