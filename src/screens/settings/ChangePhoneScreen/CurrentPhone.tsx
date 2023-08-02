import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Keyboard } from 'react-native';
import styles from './styles';
import { useAppSelector } from '../../../utils/hooks';
import { parsePhoneNumber, CountryCode, getPhoneCode } from 'libphonenumber-js';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import { Colors } from '../../../styles';
import { contryNameKeys } from '../../auth/LogInUsernameScreen/CountrySelect';
import { hp, wp } from '../../../styles/metrics';

const CurrentPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { data: user } = useAppSelector((state) => state.user);
  const [value, setValue] = useState<ValueType | null>(null);

  useEffect(() => {
    if (user?.phone) {
      try {
        const parsed = parsePhoneNumber(user.phone);
        if (parsed.isValid()) {
          setPhoneNumber(parsed.nationalNumber as string);
          if (!parsed.country) return;
          setValue(parsed.country);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }, [user?.phone]);

  const onChangePhone = (text: string) => {
    setPhoneNumber(text);
  };

  useEffect(Keyboard.dismiss, [open]);

  return (
    <View style={styles.subContainer}>
      <DropDownPicker
        zIndex={2000}
        searchable={true}
        placeholder="Select the country"
        disabled={!!user?.phone}
        open={open}
        value={value}
        items={contryNameKeys}
        setOpen={setOpen}
        setValue={setValue}
        style={[styles.containerStyle, { borderBottomWidth: 0.5, borderColor: Colors.greyish5 }]}
        containerStyle={styles.containerStyle}
        searchContainerStyle={{ ...styles.containerStyle, padding: 0, margin: 0 }}
        itemSeparator={true}
        selectedItemLabelStyle={styles.selectedItemLabelStyle}
        selectedItemContainerStyle={styles.selectedItemContainerStyle}
        itemSeparatorStyle={styles.itemSeparatorStyle}
        searchTextInputStyle={styles.searchTextInputStyle}
        searchPlaceholderTextColor={Colors.greyish4}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        dropDownDirection="AUTO"
        bottomOffset={100}
        showTickIcon={false}
        showArrowIcon={!user?.phone}
        placeholderStyle={styles.placeholderStyle}
      />
      <View style={{ flexDirection: 'row', marginTop: hp(1.2), paddingHorizontal: wp(1) }}>
        <View style={styles.textContainer}>
          <Text style={value ? styles.blackText : styles.greyText}>
            {value ? `+${value !== 'AQ' ? getPhoneCode(value as CountryCode) : 672}` : 'Code'}
          </Text>
        </View>
        <TextInput
          editable={!user?.phone}
          value={phoneNumber}
          onChangeText={onChangePhone}
          placeholderTextColor={Colors.greyish4}
          style={styles.inputContainer}
          placeholder="Phone number"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default CurrentPhone;
