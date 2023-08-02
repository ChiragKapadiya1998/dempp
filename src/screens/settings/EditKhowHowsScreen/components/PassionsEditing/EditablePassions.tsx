import React, { FC, useEffect, useState, useCallback } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GeneralPreloader from '../../../../../components/preloaders/GeneralPreloader';
import { actions } from '../../../../../ducks/passions';
import { Passion, PassionCategoryEdit } from '../../../../../ducks/passions/types';
import { Colors } from '../../../../../styles';
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import styles from './styles';
import axios from 'axios';
import Config from 'react-native-config';

const EditablePassions: FC<PassionCategoryEdit> = ({ passions, id, isShowVisible, toggleOther, onPreesShow }) => {
  const { selectCategories, categories } = useAppSelector((state) => state.passions);

  const { accessToken } = useAppSelector((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Passion[]>([]);
  const [query, setQuery] = useState('');

  const dispatch = useAppDispatch();
  const [showCount, setShowCount] = useState(3);

  const onSelectPassion = (passion: Passion) => {
    dispatch(actions.togglePassions(passion?.categoryId ? passion : { ...passion, categoryId: id }));
    setData([]);
    setQuery('');
    dispatch(actions.toggleSelectPassions());
  };

  const parsedPassions = useCallback(
    (newData: Passion[]) => {
      const trimedQuery = query.trimEnd().trimStart();
      const find = newData.find((passion) => passion.name === trimedQuery);

      setData(find ? newData : [...newData, { categoryId: id, name: trimedQuery, selected: false }]);
    },
    [query],
  );

  const finalCategories = [];
  categories.map((item) => {
    item.passions.map((element) => {
      finalCategories.push(element);
    });
  });

  useEffect(() => {
    const trimedQuery = query.trimEnd().trimStart();
    if (trimedQuery.length >= 1 && accessToken) {
      setLoading(true);
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
        .finally(() => setLoading(false));
    } else {
      setData([]);
    }
  }, [query]);

  return (
    <>
      <View style={styles.myPassionContainer}>
        {passions
          ?.slice()
          ?.sort(function (a, b) {
            if (a.selected > b.selected) return -1;
            if (a.selected < b.selected) return 1;
            return 0;
          })
          ?.map((item, index) => {
            let passionStyle =
              item?.id % 3 === 1 ? styles.passionButonSelected1 : item?.id % 3 === 2 ? styles.passionButonSelected2 : styles.passionButonSelected;
            if (index + 1 <= showCount)
              return (
                <TouchableOpacity
                  style={[item.selected ? passionStyle : styles.passionButtonUnselected, styles.passionButton]}
                  key={'id' in item ? item.id : item.name}
                  onPress={() => onSelectPassion(item)}
                >
                  <Text style={[styles.passionButtonText, item.selected ? styles.passionButonSelectedText : styles.passionButtonUnselectedText]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
          })}
        {passions?.length - showCount > 0 ? (
          <TouchableOpacity style={[styles.passionButton, { borderWidth: 1 }]} onPress={() => setShowCount((prev) => prev + 3)}>
            <Text style={[styles.passionButtonText, styles.passionButtonUnselectedText]}>+{passions.length - showCount} More</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity
        style={{}}
        onPress={() => {
          toggleOther();
          setData([]);
          setQuery('');
        }}
      >
        <Text
          style={[
            isShowVisible ? styles.passionButonSelected : styles.passionButtonUnselected,
            styles.AddButton,
            styles.addPassionButton,

            styles.addPassionButtonText,
          ]}
        >
          Add +
        </Text>
      </TouchableOpacity>
      {isShowVisible && (
        <>
          <TextInput
            placeholderTextColor={Colors.greyish26}
            placeholder={'Add know-hows'}
            style={styles.otherPassionInput}
            returnKeyType={'default'}
            onChangeText={setQuery}
            value={query}
            keyboardType={Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'}
          />
          {data.length > 0 ? <Text style={styles.subTitleText}>KNOW-hows suggestion</Text> : null}
          <View style={styles.otherPassionsContainer}>
            {!loading ? (
              data.map((item) => (
                <TouchableOpacity
                  style={[item.selected ? styles.passionButonSelected : styles.passionButtonUnselected, styles.passionButton]}
                  key={'id' in item ? item.id : item.name}
                  onPress={() => {
                    const finlData = finalCategories?.filter((element) => {
                      return element.name.toLowerCase() == item.name.toLowerCase();
                    });
                    if (finlData.length > 0) {
                      onPreesShow(true);
                    } else {
                      onSelectPassion(item);
                    }
                  }}
                >
                  <Text style={[styles.passionButtonText, item.selected ? styles.passionButonSelectedText : styles.passionButtonUnselectedText]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <GeneralPreloader containerStyle={{ height: 48.5 }} color={Colors.primary1} />
            )}
          </View>
        </>
      )}
    </>
  );
};

export default EditablePassions;
