import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, SectionList, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { isEmpty } from 'lodash';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@react-navigation/elements';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabHeaderProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/lib/typescript/src/types';

import { ISIOS, useAppDispatch, useAppSelector, useKeyboard } from '../../../utils/hooks';
import { actions } from '../../../ducks/invite';
import { contactsActions } from '../../../ducks/contacts';
import { ParlaContact } from '../../../ducks/contacts/types';
import { BottomStackParamsList } from '../../../navigators/types';
import defaultHeaderBarOptions, { defaultTabHeaderOptions } from '../../../navigators/defaultHeaderOptions';
import LeftChevronButton from '../../../components/common/Header/components/LeftChevronButton';
import SvgIcon from '../../../components/common/SvgIcon';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';
import { hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const getUnicLetters = (arr: string[]) => [...new Set(arr)];

const ContactsScreen = () => {
  const { params } = useRoute();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [unicAlphabetLabels, setUnicAlphabetLabels] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState('');
  const [sectionsData, setSectionsData] = useState<{ title: string; data: ParlaContact[] }[]>([]);
  const [defaultData, setDefaultData] = useState<{ title: string; data: ParlaContact[] }[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<ParlaContact['phoneNumbers'][0] | null>(null);
  const [selectedNumberItem, setSelectedNumberItem] = useState([]);
  const { contacts } = useAppSelector((state) => state.contacts);
  const { isKeyboardHows, keyboardHeight } = useKeyboard();
  const scrollRef = useRef();

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<BottomStackParamsList>>();

  useEffect(() => {
    dispatch(contactsActions.getContactsRequest());
  }, []);
  useEffect(() => {
    if (isKeyboardHows) {
      scrollRef?.current?.scrollToEnd();
    }
  }, [isKeyboardHows]);
  useEffect(() => {
    if (!contacts.length) return;
    const letters = getUnicLetters(contacts.map((contacts) => contacts.givenName.charAt(0).toUpperCase())).sort();
    const parsedContacts = letters.map((letter) => ({
      title: letter,
      data: contacts.filter((contact) => contact.givenName.charAt(0).toUpperCase() === letter),
    }));
    setUnicAlphabetLabels(letters);
    setSectionsData(parsedContacts);
    setDefaultData(parsedContacts);
  }, [contacts]);

  useEffect(() => {
    if (searchQuery.length === 1) {
      setSectionsData(defaultData.filter((section) => section.title === searchQuery));
    } else if (searchQuery.length === 0) {
      setSectionsData(defaultData);
    } else {
      setSectionsData([
        {
          title: 'Search',
          data: contacts.filter((contact) => contact.givenName.match(searchQuery) || contact.familyName.match(searchQuery)),
        },
      ]);
    }
    // const options: BottomTabNavigationOptions = {
    //   headerShown: true,
    //   header: RenderCustomHeader,
    // };
    // navigation.setOptions(options);
  }, [searchQuery]);

  // handlers
  const onInvitePress = () => {
    if (selectedNumber && !selectedNumber.inParla) {
      dispatch(actions.inviteUserRequest({ phone: selectedNumber.number, from: selectedNumberItem.length > 1 ? params?.from : '' }));
      setSelectedNumber(null);
      setSearchQuery('');
      setSelectedNumberItem([]);
    }
  };

  const onDropSelected = () => {
    let result = selectedNumberItem.filter((item) => item?.inParla != true);
    setSelectedNumberItem(result);
    setSelectedNumber(null);
    setSelectedName('');
  };

  const onPressSelectItem = (item: any, isNumber: boolean) => {
    if (isNumber) {
      let finalData = [...selectedNumberItem];

      if (!item.phoneNumbers[0].inParla) {
        let abc = selectedNumberItem.filter((iSelectedNumberItem: any) => iSelectedNumberItem.number == item.phoneNumbers[0].number);

        if (abc?.length == 0) {
          finalData.push(item.phoneNumbers[0]);
        } else {
          finalData = selectedNumberItem.filter(
            (iSelectedNumberItem: any) => iSelectedNumberItem.number != item.phoneNumbers[0].number && item.phoneNumbers[0].inParla == false,
          );
        }
      }
      setSelectedNumberItem(finalData);
      setSelectedNumber(item.phoneNumbers[0]);
    } else {
      let finalData = [...selectedNumberItem];
      if (!item?.inParla) {
        let abc = selectedNumberItem.filter((iSelectedNumberItem: any) => iSelectedNumberItem.number == item.number);

        if (abc?.length == 0) {
          finalData.push(item);
        } else {
          finalData = selectedNumberItem.filter((iSelectedNumberItem: any) => iSelectedNumberItem.number != item.number);
        }
      }
      setSelectedNumberItem(finalData);
      setSelectedNumber(item);
    }
  };
  // renders
  const RenderCustomHeader = (props: BottomTabHeaderProps) => {
    return (
      <>
        <Header
          title={'Contacts'}
          {...props}
          {...defaultTabHeaderOptions}
          headerLeft={(props) => <LeftChevronButton {...props} onPress={navigation.goBack} tintColor={Colors.greyish3} />}
        />
        {props.navigation.isFocused() && (
          <View style={styles.searchInputContainer}>
            <SvgIcon name={'search-icon'} height={hp(2.2)} color={Colors.greyish3} />
            <TextInput style={styles.searchInput} placeholder={'Search'} onChangeText={setSearchQuery} value={searchQuery} />
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Header
        title={'Contacts'}
        {...defaultHeaderBarOptions}
        headerLeft={(props) => <LeftChevronButton {...props} onPress={navigation.goBack} tintColor={Colors.greyish3} />}
      />
      {navigation.isFocused() && (
        <View style={styles.searchInputContainer}>
          <SvgIcon name={'search-icon'} height={hp(2.2)} color={Colors.greyish3} />
          <TextInput
            style={styles.searchInput}
            placeholderTextColor="#7A869A"
            placeholder={'Search'}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      )}
      <View style={{ flex: 1, marginBottom: insets.bottom }}>
        <SectionList
          contentContainerStyle={{ paddingBottom: isKeyboardHows ? keyboardHeight : 0 }}
          keyExtractor={(item) => item.recordID}
          ItemSeparatorComponent={() => {
            return (
              <View style={{ marginRight: wp(1), marginHorizontal: wp(4.2) }}>
                <SvgIcon name={'lineBorder-icon'} height={wp(0.6)} style={{ marginLeft: wp(-8) }} />
              </View>
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{title}</Text>
            </View>
          )}
          sections={sectionsData}
          extraData={{ selectedNumber, searchQuery }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index, section }) => {
            let addindex = selectedNumberItem?.findIndex((obj) => obj?.number === item.phoneNumbers[0].number);

            return (
              <TouchableOpacity
                disabled={item.phoneNumbers.length > 1}
                onPress={() => {
                  {
                    onPressSelectItem(item, true);
                    setSelectedName(`${item.givenName} ${item.familyName}`);
                  }
                }}
                style={{
                  backgroundColor: addindex >= 0 ? 'transparent' : 'transparent',
                }}
              >
                <View
                  key={item.recordID}
                  style={{
                    ...styles.contact,
                    ...(item.phoneNumbers.length > 1 && { paddingBottom: 0 }),
                    borderBottomWidth: section.data.length === index + 1 ? 0 : 0,
                  }}
                >
                  {item.phoneNumbers.length > 1 && (
                    <Text style={styles.contactText}>
                      {item.givenName} {item.familyName}
                    </Text>
                  )}
                  {item.phoneNumbers.length > 1 ? (
                    <View style={styles.multiplyContainer}>
                      {item.phoneNumbers.map((phoneItem) => {
                        let addindex1 = selectedNumberItem?.findIndex((obj) => obj?.number === phoneItem.number);
                        return (
                          <TouchableOpacity
                            key={`${phoneItem.number}`}
                            onPress={() => {
                              onPressSelectItem(phoneItem, false), setSelectedName(`${item.givenName} ${item.familyName}`);
                            }}
                            // style={{ backgroundColor: addindex1 >= 0 ? Colors.transparent : 'transparent' }}
                          >
                            <View style={styles.phoneContainer}>
                              <View style={{ flexDirection: 'row', flex: 1 }}>
                                <SvgIcon
                                  name={phoneItem.inParla ? 'home-tab-icon' : 'phone'}
                                  color={phoneItem.inParla ? '' : Colors.black}
                                  height={hp(2.2)}
                                  style={styles.icon}
                                />
                                <Text style={[styles.contactText, { color: Colors.black }]}>{phoneItem.number}</Text>
                              </View>
                              {!phoneItem.inParla && (
                                <TouchableOpacity
                                  style={{
                                    width: wp(7),
                                    height: wp(7),
                                    borderRadius: wp(7),
                                    borderWidth: 1,
                                    marginRight: wp(6),
                                    paddingVertical: hp(1),
                                    borderColor: Colors.primary3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: addindex1 >= 0 ? Colors.primary5 : Colors.transparent,
                                  }}
                                  onPress={() => {
                                    onPressSelectItem(phoneItem, false);
                                    setSelectedName(`${item.givenName} ${item.familyName}`);
                                  }}
                                >
                                  {addindex1 >= 0 && <SvgIcon name={'done'} height={wp(4)} style={{}} color={Colors.white} />}
                                </TouchableOpacity>
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  ) : (
                    <View style={styles.contactNameContainer}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        {item.phoneNumbers[0].inParla && (
                          <SvgIcon name={'home-tab-icon'} height={hp(2.44)} style={[styles.icon, { marginLeft: HORIZONTAL_MARGIN }]} color={''} />
                        )}
                        <Text style={[styles.contactText, { color: addindex >= 0 ? Colors.black : Colors.black }]}>
                          {item.givenName} {item.familyName}
                        </Text>
                      </View>
                      {!item.phoneNumbers[0].inParla && (
                        <TouchableOpacity
                          style={{
                            width: wp(7),
                            height: wp(7),
                            borderRadius: wp(7),
                            borderWidth: 1,
                            marginRight: wp(6),
                            paddingVertical: hp(1),
                            borderColor: Colors.primary3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: item.phoneNumbers.length === 1 && addindex >= 0 ? Colors.primary5 : Colors.transparent,
                          }}
                          onPress={() => {
                            onPressSelectItem(item, true);
                            setSelectedName(`${item.givenName} ${item.familyName}`);
                          }}
                        >
                          {item.phoneNumbers.length === 1 && addindex >= 0 && (
                            <SvgIcon name={'done'} height={wp(4)} style={{}} color={Colors.white} />
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {/* <ScrollView style={styles.alphabatesContainer}>
          {unicAlphabetLabels.map((label) => (
            <Text
              onPress={() => setSearchQuery(label)}
              key={label}
              style={{ color: searchQuery === label || searchQuery.length !== 1 ? Colors.primary2 : Colors.greyish4 }}
            >
              {label}
            </Text>
          ))}
        </ScrollView> */}
      </View>

      {/* {selectedNumber && !selectedNumber.inParla && ( */}
      {
        <>
          {selectedNumberItem?.length > 0 && !selectedNumber?.inParla && (
            <View style={[styles.footerContent, { paddingBottom: ISIOS ? 0 : insets.bottom }]}>
              <TouchableOpacity style={[styles.inviteButton]} onPress={onInvitePress}>
                <Text style={styles.inviteButtonText}>{`Send an invite (${selectedNumberItem?.length})`}</Text>
              </TouchableOpacity>
              <SafeAreaView edges={['top']} />
            </View>
          )}
          {selectedNumber && selectedNumber.inParla && (
            <View style={[styles.bottomAlert, { marginBottom: ISIOS ? 0 : insets.bottom - 10 }]}>
              <Text style={styles.bottomAlertText}>{`${selectedName} is already a Parlaapp user`}</Text>
              <TouchableOpacity onPress={onDropSelected}>
                <Text style={styles.bottomAlertButtonText}>{'Try another'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      }

      {/* )} */}
    </View>
  );
};

export default ContactsScreen;
