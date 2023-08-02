import React, { useState, createRef, useEffect, useCallback } from 'react';
import { Keyboard, Text, TextInput, View, TouchableHighlight, TouchableOpacity, Platform } from 'react-native';
import axios from 'axios';
import remoteConfig from '@react-native-firebase/remote-config';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions } from '../../../ducks/passions';
import { actions as userAction } from '../../../ducks/user';

import { SMALL_PRELOADER_SIZE } from '../../../utils/constants';
import GeneralPreloader from '../../preloaders/GeneralPreloader';
import SvgIcon from '../SvgIcon';
import { hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import styles from './styles';
import ErrorMessage from '../../forms/ErrorMessage';
import { store } from '../../../store';
import { User } from '../../../ducks/user/types';
import { fontFamily } from '../../../utils/functions';

const modeColor = (mode: User['availabilityStatus']) => {
  switch (mode) {
    case 'sleep':
      return 'rgba(165, 173, 186, 0.2)';
    case 'feeling-chatty':
      return '#DEEBFF';
    default:
      return 'rgba(165, 173, 186, 0.1)';
  }
};

// Mock controller
const useMicrophone = false;

export const queryInputRef = createRef<TextInput>();

const SearchInput = ({ focused, onTexFocus, onChange, onCancelPress, onSubmitPress, onTexBlur, setAddQueryInput }: any) => {
  const dispatch = useAppDispatch();
  const { loading, recomended } = useAppSelector((state) => state.passions);
  const [suggesions, setSuggesions] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const searchtagLength = remoteConfig().getValue('searchtagLength').asNumber();

  const onChangeText = (text: string) => {
    setQuery(text);
    onChange(text);
    if (text == '') {
      setAddQueryInput(true);
      onCancelPress();
    }
  };

  const onSearch = (text: string) => {
    if (text.length >= searchtagLength) {
      setQuery(text);
      onChange(text);
      dispatch(actions.getRecomendedPassionsRequest({ query: text }));
      Keyboard.dismiss();
      onTexBlur();
      onSubmitPress();
    }
  };

  useEffect(() => {
    if (query.length < searchtagLength) {
      dispatch(actions.clearPassionsData());
      setSuggesions([]);
    }
    if (query.length >= searchtagLength) {
      axios.get<[string, string[]]>(`http://suggestqueries.google.com/complete/search?client=firefox&q=${query}`).then(({ data }) => {
        if (data[1].length == 0) {
          setSuggesions([query]);
        } else {
          setSuggesions(data[1].slice(0, 4));
        }
      });
    }
  }, [query]);

  useEffect(() => {
    if (store.getState().calls.callStatus === 'connected') {
      setSuggesions([]);
      setQuery('');
      onCancelPress();
      onTexBlur();
      setAddQueryInput(true);
    }
  }, [store.getState().calls.callStatus]);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderBottomStartRadius: focused && query.length > 2 ? 0 : hp(2.2),
            borderBottomEndRadius: focused && query.length > 2 ? 0 : hp(2.2),
            backgroundColor: 'white',
            shadowColor: 'grey',
            shadowOffset: {
              width: -2,
              height: focused ? 1 : 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: focused ? 2 : 10,
            elevation: 8,
          },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(2.8) }}>
          <SvgIcon name={'search-icon'} height={hp(2.2)} color={Colors.greyish3} />
          <TextInput
            value={query}
            ref={queryInputRef}
            onChangeText={onChangeText}
            placeholder={'Type the topic you want talk about'}
            style={styles.input}
            placeholderTextColor={Colors.greyish3}
            returnKeyType={'go'}
            onSubmitEditing={() => onSearch(query)}
            onFocus={onTexFocus}
            onBlur={onTexBlur}
            numberOfLines={1}
            autoFocus={false}
            ellipsizeMode="tail"
            keyboardType={Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'}
          />
          {loading ? (
            <GeneralPreloader color={Colors.greyish4} containerStyle={{ width: SMALL_PRELOADER_SIZE }} />
          ) : useMicrophone ? (
            <SvgIcon name={'microphone-icon'} height={hp(2.2)} color={Colors.greyish3} />
          ) : query.length ? (
            <TouchableOpacity
              onPress={() => {
                setAddQueryInput(true);
                setQuery('');
                onCancelPress();
                dispatch(userAction.getUserQueriesRequest());
              }}
              style={{ marginHorizontal: 5 }}
            >
              <SvgIcon name={'cancel-icon'} height={16} color={Colors.greyish17} />
            </TouchableOpacity>
          ) : (
            <View style={{ width: SMALL_PRELOADER_SIZE }} />
          )}
        </View>
      </View>
      {focused && query.length >= searchtagLength ? (
        <View style={[styles.results]}>
          {suggesions.length ? (
            suggesions.map((item) => {
              return (
                <TouchableHighlight
                  underlayColor={'rgba(76, 154,255, 0.3)'}
                  key={item}
                  style={styles.result}
                  activeOpacity={0.6}
                  onPress={() => onSearch(item)}
                >
                  <Text style={styles.resultText} onPress={() => onSearch(item)}>
                    {query}
                    {suggesions.length !== 1 ? (
                      <Text style={[styles.resultText, { fontWeight: '400', fontFamily: fontFamily.rf_regular }]}>
                        {item.replace(query.toLocaleLowerCase(), '')}
                      </Text>
                    ) : null}
                  </Text>
                </TouchableHighlight>
              );
            })
          ) : loading ? null : (
            <ErrorMessage showIcon={true} containerStyle={styles.errorMessage}>
              {'Sorry, topic not found'}
            </ErrorMessage>
          )}
        </View>
      ) : (
        query.length > 0 &&
        query.length < searchtagLength && (
          <ErrorMessage showIcon={true} containerStyle={styles.errorMessage}>
            {'Query should be greater than 2 character'}
          </ErrorMessage>
        )
      )}
    </>
  );
};

export default SearchInput;
