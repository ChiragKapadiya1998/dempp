import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import styles from './styles';
import QueriesTab from './components/QueriesTab';
import DropDownDate from './components/DropDownDate';
import QueriesCallHistory from './components/QueriesCallHistory';
import QueryModal from './components/QueryModal';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions } from '../../../ducks/history';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CALL_END, CALL_END_NAVIGATION, END_CALL_NOT_SHOW_CLOSESCREEN, SMALL_PRELOADER_SIZE } from '../../../utils/constants';
import GeneralPreloader from '../../../components/preloaders/GeneralPreloader';
import { Colors } from '../../../styles';
import { actions as candidatesActions } from '../../../../src/ducks/candidates';
import FeelingChattyModal from '../HomeScreen/components/FeelingChattyModal';

const HistoryScreen = () => {
  const isFocused = useIsFocused();

  const { count, myQueries, receivedQueries, queriesLoading, modalVisible } = useAppSelector((state) => state.history);
  const { isModesvisible } = useAppSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [tabQueries, setTabQueries] = useState(1);
  const [isSelectValue, setIsSelectValue] = useState('all');
  const [data, setData] = useState([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tabQueries == 1) {
      dispatch(actions.historyQueriesRequest());
    } else {
      dispatch(actions.historyReceviedRequest());
    }
    const onCallEnd = async () => {
      await AsyncStorage.setItem(CALL_END, JSON.stringify(false));
      await AsyncStorage.setItem(CALL_END_NAVIGATION, JSON.stringify(false));
    };
    onCallEnd();
  }, [isFocused]);

  useEffect(() => {
    setData(
      myQueries.filter((item) => {
        if (tabQueries == 1) {
          return item?.status !== 'pending';
        } else {
          return item?.finalStatus !== 'pending';
        }
      }),
    );
  }, [isFocused, myQueries]);

  const ontavQueriesPress = (index: number) => {
    if (index == 1) {
      dispatch(actions.historyQueriesRequest());
    } else {
      dispatch(actions.historyReceviedRequest());
    }
    setData(myQueries);
    setTabQueries(index);
    setIsSelectValue('all');
  };
  const openQueriesModal = async (item: any) => {
    await AsyncStorage.setItem(END_CALL_NOT_SHOW_CLOSESCREEN, JSON.stringify(false));
    let finaData = {
      id: item.id,
      index: tabQueries,
    };
    dispatch(candidatesActions.removeCustomLoading());
    dispatch(actions.toggleModalHistory(true));
    dispatch(actions.historyQueriesInfoRequest(finaData));
  };

  useEffect(() => {
    const final =
      tabQueries == 2 && myQueries.length > 0
        ? myQueries.filter((item) => {
            return item?.finalStatus == 'missed' || item?.finalStatus == 'disconnected';
          })
        : null;

    tabQueries == 2 && myQueries.length > 0 && dispatch(actions.updateHistoryStatus(final?.length));
  }, [myQueries]);

  return (
    <View
      accessible={false}
      // onMoveShouldSetResponder={() => setOpen(false)}
      style={[styles.screen]}
    >
      <QueriesTab onPress={(index: any) => ontavQueriesPress(index)} tabQueries={tabQueries} count={count} />
      <DropDownDate open={open} isSelectValue={isSelectValue} setIsSelectValue={setIsSelectValue} tabQueries={tabQueries} setOpen={setOpen} />
      {queriesLoading ? (
        <GeneralPreloader containerStyle={{ width: SMALL_PRELOADER_SIZE, alignSelf: 'center', justifyContent: 'center' }} color={Colors.primary4} />
      ) : (
        <ScrollView style={{}} showsVerticalScrollIndicator={false} bounces={false}>
          {data
            ?.filter((item: any) => {
              if ('all' == isSelectValue) {
                return item;
              } else {
                if (tabQueries == 1) {
                  return item?.status === isSelectValue;
                } else {
                  return item?.finalStatus === isSelectValue;
                }
              }
            })
            .map((item, index) => {
              return (
                <>
                  <QueriesCallHistory finalData={item} index={index} tabQueries={tabQueries} openQueriesModal={openQueriesModal} />
                </>
              );
            })}
        </ScrollView>
      )}
      {modalVisible && <QueryModal tabQueries={tabQueries} />}
      {isModesvisible && <FeelingChattyModal isVisibleModal={isModesvisible} />}

      <Image
        source={require('../../../../assets/images/topshadow.png')}
        style={{ top: 10, position: 'absolute', height: 120, alignItems: 'flex-start' }}
      />
    </View>
  );
};
export default HistoryScreen;
