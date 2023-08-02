import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import remoteConfig from '@react-native-firebase/remote-config';

import { ISIOS, useAppDispatch, useAppSelector, useKeyboard } from '../../../utils/hooks';
import { actions } from '../../../ducks/passions';
import { Passion } from '../../../ducks/passions/types';
import styles from './styles';
import GeneralPreloader from '../../preloaders/GeneralPreloader';
import { Colors } from '../../../styles';
import { hp, wp } from '../../../styles/metrics';
import SearchButton from '../SearchButton';

const PassionResults = ({ setAddQueryInput, addQueryInput }: any) => {
  const { recomended, loading, err } = useAppSelector((state) => state.passions);
  const { accessToken } = useAppSelector((state) => state.token);
  const [other, setOther] = useState(false);
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Passion[]>([]);
  const [addloading, setAddLoading] = useState(false);
  const scrollRef = useRef();
  const { isKeyboardHows } = useKeyboard();

  useEffect(() => {
    if (isKeyboardHows) {
      scrollRef?.current?.scrollToEnd();
    }
  }, [isKeyboardHows]);

  const dispatch = useAppDispatch();

  const onSelectPassion = (passion: Passion) => {
    const passionList = recomended?.filter?.((e) => e?.name?.toLowerCase() === passion?.name?.toLowerCase());
    if (passionList.length === 0) {
      dispatch(actions.getRecomendedPassionsSuccess([...recomended, { ...passion, selected: !passion.selected }]));
      setData([]);
      setQuery('');
      setAddQueryInput(!addQueryInput);
      setOther((prev) => !prev);
    } else {
      Alert.alert('KNOW-hows suggestion', 'Same know-hows already there!');
    }
  };

  const toggleOther = () => {
    setAddQueryInput(!addQueryInput);
    setOther((prev) => !prev);
  };

  const parsedPassions = useCallback(
    (newData: Passion[]) => {
      const trimedQuery = query.trimEnd().trimStart();
      const find = newData.find((passion) => passion.name === trimedQuery);

      setData(find ? newData : [...newData]);
    },
    [query],
  );

  useEffect(() => {
    const trimedQuery = query.trimEnd().trimStart();
    if (trimedQuery.length > 0 && accessToken) {
      setAddLoading(true);
      const url = `${Config.BASE_URL}/passions?search=${trimedQuery}`;
      axios
        .get<Passion[]>(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({ data }) => {
          parsedPassions(data);
        })
        .catch(console.error)
        .finally(() => setAddLoading(false));
    } else {
      setData([]);
    }
  }, [query]);

  const onCategoryPress = (passion: Passion) => {
    dispatch(actions.toggleRecomendedPassions(passion));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      {!loading && recomended.length ? <Text style={styles.recomendedText}>Please select at least 1 know-how</Text> : null}
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={-160}
        style={styles.scrollContainer}
        ref={scrollRef}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: ISIOS ? 0 : isKeyboardHows ? 100 : 0 }}
      >
        <View>
          <View style={styles.container}>
            {loading || !err ? null : <Text style={styles.error}>{err}</Text>}
            {recomended.map((item, index) => {
              let passionStyle = index % 3 === 1 ? styles.selectedCategory1 : index % 3 === 2 ? styles.selectedCategory2 : styles.selectedCategory;
              return (
                <View style={styles.categoryWrapper} key={item.id?.toString()}>
                  <TouchableOpacity
                    onPress={() => onCategoryPress(item)}
                    style={[item.selected ? passionStyle : styles.selectedCategoryUnselected, styles.category]}
                  >
                    <Text style={[styles.categoryText, item.selected ? styles.selectedCategoryText : undefined]}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            {!loading && recomended.length ? (
              <TouchableOpacity
                style={[other ? styles.passionButonSelected : styles.passionButtonUnselected, styles.category1, styles.addPassionButton]}
                onPress={toggleOther}
              >
                <Text style={styles.addPassionButtonText}>{'Select another tag'}</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {!loading && recomended.length
            ? other && (
                <>
                  <TextInput
                    placeholder={'Add know-hows'}
                    style={styles.otherPassionInput}
                    returnKeyType={'default'}
                    onChangeText={setQuery}
                    value={query}
                    autoFocus={true}
                    placeholderTextColor={Colors.greyish26}
                    keyboardType={Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'}
                  />
                  {data.length > 0 ? <Text style={styles.subTitleText}>KNOW-hows suggestion</Text> : null}
                  <View style={styles.otherPassionsContainer}>
                    {!addloading ? (
                      data.map((item) => (
                        <TouchableOpacity
                          style={[item.selected ? styles.passionButonSelected : styles.passionButtonUnselected, styles.passionButton]}
                          key={'id' in item ? item.id : item.name}
                          onPress={() => onSelectPassion(item)}
                        >
                          <Text
                            style={[styles.passionButtonText, item.selected ? styles.passionButonSelectedText : styles.passionButtonUnselectedText]}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <GeneralPreloader containerStyle={{ height: hp(4.5) }} color={Colors.primary1} />
                    )}
                  </View>
                </>
              )
            : null}
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginHorizontal: wp(2) }}>
          <SearchButton />
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

export default PassionResults;
