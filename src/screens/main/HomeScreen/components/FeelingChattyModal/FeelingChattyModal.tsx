import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Colors } from '../../../../../styles';
import SvgIcon from '../../../../../components/common/SvgIcon';
import { userStatus } from '../../../../../utils/reportReasons';
import { hp, wp } from '../../../../../styles/metrics';
import OptionItem from '../OptionItem';
import { ISIOS, useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import { actions as userActions } from '../../../../../ducks/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FeelingChattyModal = ({ isVisibleModal }: any) => {
  const { isModesValue } = useAppSelector((state) => state.user);
  const [impression, setImpression] = useState<number>(0);
  const [impressionSelect, setImpressionSelect] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<any>({});
  const [modesList, setModesList] = useState<any>([]);
  const [selectOption, setselectOption] = useState<boolean>(false);
  const [maxQueriesPerValue, setMaxQueriesPerValue] = useState<number>(0);
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const closeModal = () => {
    setModesList(
      modesList?.map((i) => {
        return { ...i, isViewVisible: false };
      }),
    );
    const chagegeValue = {
      isModesvisible: false,
      isModesValue: selectValue,
    };
    dispatch(userActions.userModesPress(chagegeValue));
    if (selectValue.value == 'do not disturb') {
      if (user?.sleepTimeInHours !== impression) {
        dispatch(userActions.updateUserStatusRequest({ availabilityStatus: 'sleep', timeInHours: impressionSelect ? 2 : impression }));
      }
    } else if (selectValue.value == 'Chatty') {
      dispatch(userActions.updateUserStatusRequest({ availabilityStatus: 'feeling-chatty', timeInHours: 0 }));
    } else {
      dispatch(userActions.updateUserStatusRequest({ availabilityStatus: 'available', maxQueriesPerDay: maxQueriesPerValue, timeInHours: 0 }));
    }
  };

  useEffect(() => {
    setModesList(
      userStatus?.map((i) => {
        return { ...i, isViewVisible: false };
      }),
    );
    setMaxQueriesPerValue(user?.maxQueriesPerDay);
    let key = user?.availabilityStatus == 'sleep' ? user?.sleepTimeInHours ?? 2 : 2;

    setImpression(key);
  }, [user?.availabilityStatus]);

  const onPressPlusBtn = () => {
    setMaxQueriesPerValue((pre) => pre + 1);
  };
  const onPressMinusBtn = () => {
    maxQueriesPerValue > 0 && setMaxQueriesPerValue((pre) => pre - 1);
  };

  const onPressSelectValue = (item: any) => {
    setSelectValue({ icon: item.icon, value: item.value });
    onPressRightIcon(item);
    setImpressionSelect(true);
    setModesList(
      modesList?.map((i) => {
        return { ...i, isViewVisible: false };
      }),
    );
  };

  const doNotOptionPress = (i: any, list: any) => {
    setImpression(i.key);
    setImpressionSelect(false);
    setSelectValue({ icon: list.icon, value: list.value });
  };

  const onPressRightIcon = (list: any) => {
    let newData = [...modesList];
    newData.map((i) => {
      if (i.id == list.id) {
        i.isViewVisible = !i.isViewVisible;
      } else {
        i.isViewVisible = false;
      }
    });
    setModesList(newData);
  };
  useEffect(() => {
    setSelectValue(isModesValue);
  }, [isModesValue]);

  return (
    <Modal
      animationIn="fadeInDown"
      animationInTiming={1}
      animationOut="bounceOutDown"
      animationOutTiming={500}
      backdropColor={'#4A5362'}
      backdropOpacity={0.8}
      backdropTransitionOutTiming={0}
      isVisible={isVisibleModal}
      statusBarTranslucent
      style={[styles.overlay]}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
    >
      <View style={[styles.main]}>
        <Text style={[styles.bottomAlertText, { color: Colors.greyish1 }]}>{`Modes`}</Text>
        {modesList?.map((item, index) => {
          return (
            <View
              style={[
                styles.containerMain,
                { backgroundColor: item?.value == selectValue?.value ? Colors.secondary12 : Colors.secondary11, marginBottom: hp(2) },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.container,
                  {
                    backgroundColor: item?.value == selectValue?.value ? Colors.primary4 : Colors.secondary11,
                    borderBottomEndRadius:
                      item?.value == selectValue?.value ? (item?.value != 'Chatty' ? (selectOption ? 0 : wp(5.5)) : wp(5.5)) : wp(5.5),
                    borderBottomStartRadius:
                      item?.value == selectValue?.value ? (item?.value != 'Chatty' ? (selectOption ? 0 : wp(5.5)) : wp(5.5)) : wp(5.5),
                  },
                ]}
                onPress={() => {
                  onPressSelectValue(item);
                }}
              >
                <View>
                  {item?.icon && (
                    <SvgIcon
                      name={item?.icon}
                      height={wp(4.5)}
                      color={item?.value == selectValue?.value ? Colors.white : Colors.greyish3}
                      style={{}}
                    />
                  )}
                </View>
                <View style={styles.chattyContnent}>
                  <Text style={[styles.chattyText, { color: item?.value == selectValue?.value ? Colors.white : Colors.greyish3 }]}>
                    {item?.value}
                  </Text>
                  {item?.subValue != '' ? (
                    <Text style={[styles.chattySubText, { color: item?.value == selectValue?.value ? Colors.white : Colors.greyish3 }]}>
                      {`Max. ${maxQueriesPerValue} queries`}
                    </Text>
                  ) : null}
                </View>
                <TouchableOpacity
                  style={[
                    styles.rightBgStyle,
                    {
                      backgroundColor:
                        item?.value == selectValue?.value ? (item?.rightIcon ? Colors.primary8 : Colors.transparent) : Colors.transparent,
                    },
                  ]}
                  // disabled={item.value != selectValue?.value}
                  onPress={() => onPressRightIcon(item)}
                >
                  {item?.rightIcon && (
                    <SvgIcon
                      name={'dots-icon'}
                      height={wp(1.2)}
                      color={item?.value == selectValue?.value ? Colors.white : Colors.primary4}
                      style={{}}
                    />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
              {item?.isViewVisible && item?.value == 'do not disturb' && (
                <View style={{ marginVertical: hp(0.8) }}>
                  {item?.data?.map((i, key) => {
                    return (
                      <OptionItem
                        key={key}
                        isSelected={selectValue?.value == 'do not disturb' && i.key === impression}
                        title={i.label}
                        onPress={() => {
                          doNotOptionPress(i, item);
                        }}
                        index={key}
                      />
                    );
                  })}
                </View>
              )}

              {item?.isViewVisible && item?.value == 'Normal' && (
                <View style={{ marginVertical: hp(3.5), alignItems: 'center' }}>
                  <Text style={styles.icomingText}>{'Max. number of icoming queries'}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={onPressMinusBtn}>
                      <SvgIcon name={'minusbg-icon'} height={hp(3.5)} color={Colors.secondary11} />
                    </TouchableOpacity>
                    <Text style={styles.icomingValueText}>{maxQueriesPerValue}</Text>
                    <TouchableOpacity onPress={onPressPlusBtn}>
                      <SvgIcon name={'plusbg-icon'} height={hp(3.5)} color={Colors.secondary11} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </Modal>
  );
};

export default FeelingChattyModal;
