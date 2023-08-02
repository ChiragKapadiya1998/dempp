import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { Colors } from '../../../../../styles';
import SvgIcon from '../../../../../components/common/SvgIcon';
import { userData } from '../../../../../utils/reportReasons';
import { hp, wp } from '../../../../../styles/metrics';
import AvatarSatr from '../AvatarSatr';
import moment from 'moment';
import { getSendSlack, ISIOS, useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import { actions } from '../../../../../ducks/history';
import FlatButton from '../../../../../components/forms/FlatButton';
import { actions as candidatesActions } from '../../../../../ducks/candidates';
import GeneralPreloader from '../../../../../components/preloaders/GeneralPreloader';
import { END_CALL_NOT_SHOW_CLOSESCREEN, NOT_SHOW_MATCHING_SCREEN, SMALL_PRELOADER_SIZE } from '../../../../../utils/constants';
import { fillterData, fontFamily } from '../../../../../utils/functions';
import CloseModal from '../CloseModal';
import WhiteErrorModal from '../../../../../components/modals/WhiteErrorModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AlertBox from '../../../../../components/modals/AlertBox';
import { store } from '../../../../../store';
import _ from 'lodash';

const QueryModal = ({ tabQueries }: any) => {
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [closeOrDecline, setCloseOrDecline] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const { queriesInfo, modalVisible, closeLoading } = useAppSelector((state) => state.history);
  const { data } = useAppSelector((state) => state.user);
  const { loading, matchDataNotFound, errorMessage } = useAppSelector((state) => state.candidates);

  let selectData = queriesInfo?.query;
  let selectStatus = tabQueries == 1 ? queriesInfo?.query?.status : queriesInfo.finalStatus;
  let callQueries = queriesInfo?.query?.user;
  let callData = queriesInfo?.calls;

  const grouped = _.groupBy(callData, (item) => item?.call?.matchId);

  const uniqueCallData = [...new Map(fillterData(grouped)?.map((item, key) => [item?.call?.matchId, item])).values()];
  const myQuery = tabQueries == 1 ? true : false;

  const onPressModal = () => {
    setShowModalError(false);
    dispatch(candidatesActions.searchCandidatesToggles({ value: false, errorMessage: null }));
  };

  useEffect(() => {
    if (store.getState().calls.callStatus !== 'connected') {
      setTimeout(() => {
        setShowModalError(matchDataNotFound);
      }, 100);
    }
  }, [matchDataNotFound]);

  const closeModal = () => {
    dispatch(actions.toggleModalHistory(false));
  };

  const onPressRecallQuery = async (item: any) => {
    await AsyncStorage.setItem(END_CALL_NOT_SHOW_CLOSESCREEN, JSON.stringify(false));
    await AsyncStorage.setItem(NOT_SHOW_MATCHING_SCREEN, JSON.stringify(true));
    const finalValue = {
      id: item.id,
      recall: true,
    };

    dispatch(candidatesActions.searchCandidatesRequest(finalValue));
  };

  const onPressAnswerClosedQuery = (item: any) => {
    dispatch(actions.historyAnswerClosedQueryRequest({ id: queriesInfo?.id, status: item }));
  };

  const onPresscallBackQuery = async (item: any) => {
    await AsyncStorage.setItem(END_CALL_NOT_SHOW_CLOSESCREEN, JSON.stringify(false));
    await AsyncStorage.setItem(NOT_SHOW_MATCHING_SCREEN, JSON.stringify(true));
    const finalValue = {
      id: myQuery ? item?.call?.matchId : queriesInfo?.id,
      recall: false,
      callBack: true,
      myQueryTab: myQuery,
    };

    dispatch(candidatesActions.searchCandidatesRequest(finalValue));
  };

  const onPressCloseQuery = (item: boolean) => {
    setCloseOrDecline(item);
    setIsVisibleModal(true);
  };
  const onPressYesClick = (item: any) => {
    if (closeOrDecline) {
      dispatch(actions.historyQueriesCloseRequest({ id: selectData.id, status: 'closed' }));
    } else {
      //decline
      dispatch(actions.historyQueriesCloseRequest({ id: queriesInfo.id, status: 'declined' }));
    }
    setIsVisibleModal(false);
  };

  const TextStyleColor =
    selectStatus === 'answered'
      ? Colors.primary4
      : selectStatus === 'unanswered' || selectStatus === 'missed' || selectStatus == 'disconnected'
      ? Colors.destructive4
      : selectStatus === 'closed'
      ? Colors.greyish27
      : selectStatus === 'declined'
      ? Colors.greyish3
      : Colors.black;

  if (!queriesInfo?.query) return null;
  return (
    <Modal
      animationIn="fadeIn"
      animationInTiming={1}
      animationOut="fadeOut"
      animationOutTiming={50}
      backdropColor={'#4A5362'}
      backdropOpacity={0.4}
      backdropTransitionOutTiming={0}
      isVisible={modalVisible}
      statusBarTranslucent
      style={[styles.overlay, { paddingBottom: ISIOS ? 0 : insets.bottom }]}
      onBackdropPress={closeModal}
    >
      <View style={styles.main}>
        {selectData ? (
          <ScrollView bounces={false}>
            <View style={styles.bottomAlert}>
              <Text style={[styles.bottomAlertText, { color: TextStyleColor }]}>
                {`${selectStatus} `}
                <Text style={{ textTransform: 'lowercase' }}>
                  {'query'}
                  {/* {selectStatus == 'answered' && tabQueries == 2 && callData?.[0]?.duration ? `- ${getTimerString(callData?.[0]?.duration)} min` : ''} */}
                </Text>
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <SvgIcon name={'cancel-icon'} height={16} color={Colors.greyish17} />
              </TouchableOpacity>
            </View>
            <Text style={styles.dateText}>{moment(selectData?.createdAt).format('DD/MM/YYYY hh:mm A')}</Text>
            <Text style={styles.ContentText}>{`"${selectData.query}"`}</Text>
            <View style={[styles.myPassionContainer]}>
              {selectData?.keywords?.map((item: any, index: any) => {
                const backgroundColor = index % 3 === 1 ? Colors.accent8 : index % 3 === 2 ? Colors.accent10 : Colors.accent9;
                return (
                  <View key={index} style={[styles.myPassion, { backgroundColor: backgroundColor, borderWidth: 0, borderColor: Colors.greyish1 }]}>
                    <Text style={[styles.myPassionText, { color: Colors.black, fontWeight: '400', fontFamily: fontFamily.rf_regular }]}>{item}</Text>
                  </View>
                );
              })}
            </View>
            {tabQueries == 1 ? (
              <>
                <Text
                  style={[
                    styles.chatqueryText,
                    { marginBottom: (selectStatus == 'answered' || selectStatus == 'closed') && uniqueCallData.length > 0 ? hp(0.9) : hp(5.3) },
                  ]}
                >
                  {(selectStatus == 'answered' || selectStatus == 'closed') && uniqueCallData.length > 0
                    ? 'chats on this query '
                    : `No chat on this query `}
                </Text>
                {(selectStatus == 'answered' || selectStatus == 'closed') && (
                  <ScrollView horizontal={true} style={styles.chatqueryMain} showsHorizontalScrollIndicator={false} bounces={false}>
                    {uniqueCallData?.map((item: any) => {
                      const callerId = item?.call?.caller?.id;
                      let itemData = {};
                      if (data?.id === callerId) {
                        itemData = item?.call?.receiver;
                      } else {
                        itemData = item?.call?.caller;
                      }

                      return (
                        <View
                          style={[
                            styles.chatqueryContent,
                            { borderWidth: myQuery ? 1 : 0, paddingHorizontal: myQuery ? wp(2.5) : 0, marginBottom: myQuery ? hp(8) : 0 },
                          ]}
                        >
                          <AvatarSatr
                            myQuery={myQuery}
                            avatar={itemData?.avatar}
                            username={itemData?.username}
                            rating={item?.feedback?.rating}
                            date={item?.feedback?.createdAt}
                            status={item?.call?.status}
                          />
                          {/* {item?.feedback?.feedback !== '' ? <Text style={styles.chatqueryContentText}>{item?.feedback?.feedback}</Text> : null} */}
                          {item?.call?.status !== 'finished' && selectStatus !== 'closed' && (
                            <TouchableOpacity style={[styles.callbackBtn, { marginTop: hp(1.2) }]} onPress={() => onPresscallBackQuery(item)}>
                              {loading ? (
                                <GeneralPreloader
                                  containerStyle={{ width: SMALL_PRELOADER_SIZE - 6, alignSelf: 'center', justifyContent: 'center' }}
                                  color={Colors.white}
                                />
                              ) : (
                                <Text style={[styles.callbackBtnText]}>{'Call back'}</Text>
                              )}
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })}
                  </ScrollView>
                )}
              </>
            ) : (
              <>
                <Text style={styles.chatReceivedText}>{'from'}</Text>
                <View style={[styles.chatqueryContent, { borderWidth: myQuery ? 1 : 0, marginBottom: hp(4) }]}>
                  <AvatarSatr myQuery={myQuery} avatar={callQueries?.avatar} username={callQueries?.username} />
                </View>
              </>
            )}

            {(selectStatus == 'missed' || (selectStatus == 'disconnected' && tabQueries == 2)) && (
              <TouchableOpacity
                style={[styles.addFromButton, { marginTop: hp(1), backgroundColor: Colors.primary4, borderWidth: 0, paddingVertical: hp(2.2) }]}
                onPress={() => onPresscallBackQuery(selectData)}
              >
                {loading ? (
                  <GeneralPreloader
                    containerStyle={{ width: SMALL_PRELOADER_SIZE - 3, alignSelf: 'center', justifyContent: 'center' }}
                    color={Colors.white}
                  />
                ) : (
                  <Text style={[styles.addFromButtonText, { color: Colors.white }]}>{'Call back'}</Text>
                )}
              </TouchableOpacity>
            )}

            {selectStatus == 'disconnected' &&
              tabQueries == 1 &&
              (callData?.length <= 0 ? (
                <TouchableOpacity
                  style={[
                    styles.addFromButton,
                    { marginTop: hp(1), backgroundColor: Colors.primary4, borderWidth: 0, paddingVertical: hp(2.2), marginBottom: hp(0.9) },
                  ]}
                  onPress={() => onPressRecallQuery(selectData)}
                >
                  {loading ? (
                    <GeneralPreloader
                      containerStyle={{ width: SMALL_PRELOADER_SIZE - 3, alignSelf: 'center', justifyContent: 'center' }}
                      color={Colors.white}
                    />
                  ) : (
                    <Text style={[styles.addFromButtonText, { color: Colors.white }]}>{'Recall query'}</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.addFromButton,
                    { backgroundColor: Colors.primary4, borderWidth: 0, paddingVertical: hp(2.2), marginBottom: hp(0.9) },
                  ]}
                  onPress={() => onPresscallBackQuery(uniqueCallData[0])}
                >
                  {loading ? (
                    <GeneralPreloader
                      containerStyle={{ width: SMALL_PRELOADER_SIZE - 3, alignSelf: 'center', justifyContent: 'center' }}
                      color={Colors.white}
                    />
                  ) : (
                    <Text style={[styles.addFromButtonText, { color: Colors.white }]}>{'Call back'}</Text>
                  )}
                </TouchableOpacity>
              ))}
            {((selectStatus == 'unanswered' && tabQueries == 1) ||
              (selectStatus == 'disconnected' && tabQueries == 1) ||
              (selectStatus == 'answered' && tabQueries == 1)) && (
              <TouchableOpacity style={[styles.addFromButton, { marginTop: hp(1) }]} onPress={() => onPressCloseQuery(true)}>
                {closeLoading ? (
                  <GeneralPreloader
                    containerStyle={{ width: SMALL_PRELOADER_SIZE - 3, alignSelf: 'center', justifyContent: 'center' }}
                    color={Colors.destructive4}
                  />
                ) : (
                  <Text style={styles.addFromButtonText}>{'Close query'}</Text>
                )}
              </TouchableOpacity>
            )}

            {(selectStatus == 'missed' || (selectStatus == 'disconnected' && tabQueries == 2)) && (
              <TouchableOpacity style={[styles.addFromButton, { marginTop: hp(1) }]} onPress={() => onPressCloseQuery(false)}>
                <Text style={styles.addFromButtonText}>{'Decline'}</Text>
              </TouchableOpacity>
            )}
            {queriesInfo?.isAnswerClosedQuery == null && selectStatus == 'closed' && tabQueries == 2 && queriesInfo?.status !== 'accepted' && (
              <>
                <Text style={[styles.answerQueryText, { marginTop: hp(2) }]}>{'Would you have liked to answer this query?'}</Text>
                <View style={styles.answerBtnContent}>
                  <TouchableOpacity style={styles.answerBtnNo} onPress={() => onPressAnswerClosedQuery(false)}>
                    <Text style={styles.answerBtnNoText}>{'No'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.answerBtnYes} onPress={() => onPressAnswerClosedQuery(true)}>
                    <Text style={styles.answerBtnYesText}>{'Yes'}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            {queriesInfo?.isAnswered && selectStatus == 'closed' && tabQueries == 2 && (
              <View style={{ flexDirection: 'row' }}>
                <SvgIcon name={'right-icon'} height={12} style={{ marginTop: hp(0.3) }} color={Colors.accent7} />
                <Text style={[styles.thankQueryText, {}]}>{'Thank you! This answer will help us choose the\nmost suitable queries for you.'}</Text>
              </View>
            )}
          </ScrollView>
        ) : null}
      </View>
      <WhiteErrorModal />
      <CloseModal
        closeOrDecline={closeOrDecline}
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
        onPressYesClick={onPressYesClick}
      />
      {showModalError && (
        <AlertBox
          onBackdropPressValue={true}
          isVisible={showModalError}
          btnStyle={{ flexDirection: 'column' }}
          btnContentStyle={{ flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: Colors.greyish7 }}
          title={errorMessage}
          message=""
          buttons={[
            {
              text: `Ok`,
              onPress: onPressModal,
            },
          ]}
        />
      )}
    </Modal>
  );
};

export default QueryModal;

// <FlatButton
//   title={'Recall query'}
//   onPress={() => onPressRecallQuery(selectData)}
//   variant={'solid1'}
//   // disabled={code.length !== 6}
//   loading={loading}
//   containerStyle={[{ backgroundColor: Colors.primary4, marginBottom: hp(0.9), minHeight: hp(6.4) }]}
// />

// <FlatButton
//   title={'Call back'}
//   onPress={() => onPresscallBackQuery(selectData)}
//   variant={'solid1'}
//   // disabled={code.length !== 6}
//   loading={loading}
//   containerStyle={[{ backgroundColor: Colors.primary4, minHeight: wp(15), marginBottom: hp(1.9) }]}
// />

// <FlatButton
//   title={'Call back'}
//   onPress={() => onPresscallBackQuery(uniqueCallData[0])}
//   variant={'solid1'}
//   // disabled={code.length !== 6}
//   loading={loading}
//   containerStyle={[{ backgroundColor: Colors.primary4, marginBottom: hp(0.9) }]}
// />
