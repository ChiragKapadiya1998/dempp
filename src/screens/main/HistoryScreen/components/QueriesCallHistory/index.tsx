import moment from 'moment';
import React, { FC } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import SvgIcon from '../../../../../components/common/SvgIcon';
import { Colors } from '../../../../../styles';
import { hp } from '../../../../../styles/metrics';
import { QueriesCallHistoryType } from '../../types';

import styles from './styles';

const QueriesCallHistory: FC<QueriesCallHistoryType> = ({ tabQueries, openQueriesModal, finalData, index, count }) => {
  let data = tabQueries == 1 ? finalData : finalData?.query;
  let headerName = tabQueries == 1 ? finalData?.status : finalData?.finalStatus;

  let dotStatus = tabQueries == 2 && finalData;

  const TextStyleColor =
    headerName === 'answered'
      ? Colors.primary4
      : headerName === 'unanswered' || headerName === 'missed' || headerName == 'disconnected'
      ? Colors.destructive4
      : headerName === 'closed' || headerName === 'declined'
      ? Colors.greyish27
      : Colors.black;

  return (
    <View style={styles.mainContent} key={index}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>{headerName && <Text style={[styles.headerLeftText, { color: TextStyleColor }]}>{headerName}</Text>}</View>

        <Text style={styles.headerRightText}>{moment(data?.createdAt).format('DD-MM-YYYY hh:mm A')}</Text>
      </View>
      <TouchableOpacity style={styles.bodyContent} onPress={() => openQueriesModal(finalData)} activeOpacity={0.6}>
        <View style={[styles.bodyLeftContent]}>
          <View style={[styles.iconStyle, { backgroundColor: TextStyleColor }]}>
            {tabQueries == 1 ? (
              headerName == 'answered' ? (
                <SvgIcon name={'search-icon'} height={hp(1.8)} color={Colors.white} />
              ) : headerName == 'unanswered' || headerName == 'closed' || headerName == 'disconnected' ? (
                <SvgIcon
                  name={headerName == 'closed' ? 'call-declined-icon' : 'call-missed-icon'}
                  height={hp(2.2)}
                  color={headerName == 'unanswered' ? Colors.white : Colors.white}
                />
              ) : (
                <SvgIcon name={'search-icon'} height={hp(2.2)} color={Colors.white} />
              )
            ) : headerName == 'answered' ? (
              <SvgIcon name={'call-answered-icon'} height={hp(2.2)} color={Colors.white} />
            ) : data.name == 'declined' || headerName == 'missed' || headerName == 'closed' || headerName == 'unanswered' ? (
              <SvgIcon
                name={'call-declined-icon'}
                height={hp(2.5)}
                color={headerName == 'missed' || headerName == 'unanswered' ? Colors.white : Colors.white}
              />
            ) : (
              <SvgIcon name={'call-declined-icon'} height={hp(2.2)} color={Colors.white} />
            )}
          </View>
          <Text style={styles.bodyLeftText}>{`"${data?.query}"`}</Text>
        </View>
        <TouchableOpacity style={styles.bodyRightContent} onPress={() => openQueriesModal(finalData)}>
          <SvgIcon name={'union-icon'} height={24} color={Colors.greyish15} />
          {tabQueries == 2 ? (headerName === 'missed' || headerName === 'disconnected') && <View style={styles.receivedCircle} /> : null}
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default QueriesCallHistory;
