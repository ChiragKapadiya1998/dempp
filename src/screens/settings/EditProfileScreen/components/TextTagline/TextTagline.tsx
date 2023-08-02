import React, { useState, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import ErrorMessage from '../../../../../components/forms/ErrorMessage';
import FlatButton from '../../../../../components/forms/FlatButton';
import SvgIcon from '../../../../../components/common/SvgIcon';
import TextInput from '../../../../../components/forms/TextInput';
import styles from './styles';
import { Colors } from '../../../../../styles';
import { FormData } from './types';
import { actions as userActions } from '../../../../../ducks/user';
import { updateTaglineSchema } from '../../../../../utils/yupSchemas';
import { useAppSelector } from '../../../../../utils/hooks';
import { actions as passionsActions } from '../../../../../ducks/passions';

import remoteConfig from '@react-native-firebase/remote-config';

import { Container, TaglineText, LabelContainer, LabelText, EditButton, ButtonsContainer } from './styled';
import { fontSize, hp } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';
import { registerGlobals } from 'react-native-webrtc';

const TextTagline = () => {
  const dispatch = useDispatch();
  const { isEditTagline, isUserEditing } = useAppSelector((state) => state.user);
  const { isEditing } = useAppSelector((state) => state.passions);

  const [status, setStatus] = useState<'Viewing' | 'Editing'>('Viewing');
  const initTagline = useAppSelector((state) => state.user.data?.tagline);
  const [tagline, setTagline] = useState<string>('');

  const borderStyle = isUserEditing ? 'rgb(202,209,220)' : isEditing ? 'rgb(202,209,220)' : Colors.greyish28;
  const TaglineTextColor = isUserEditing ? Colors.greyish2 : isEditing ? Colors.greyish2 : Colors.greyish1;
  const LabelTextColor = isUserEditing ? Colors.greyish3 : isEditing ? Colors.greyish3 : Colors.greyish3;
  // Form hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(updateTaglineSchema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    setValue('tagline', initTagline ?? '');
    setTagline(initTagline ?? '');
  }, []);

  const errorMessage = formErrors.tagline?.message ?? '';
  // const isEditing = status === 'Editing';

  const onEditButtonPress = () => {
    setStatus('Editing');
    dispatch(userActions.userTaglineEditPress(true));
  };

  const onCancelButtonPress = () => {
    setStatus('Viewing');
    dispatch(userActions.userTaglineEditPress(false));
    setValue('tagline', tagline);
  };

  const onSaveButtonPress = (data: FormData) => {
    setStatus('Viewing');
    setTagline(data.tagline ?? '');
    dispatch(
      userActions.updateUserRequest({
        tagline: data.tagline,
      }),
    );
    dispatch(userActions.userTaglineEditPress(false));
  };

  return (
    <View
      onStartShouldSetResponder={() => {
        dispatch(passionsActions.toggleEditPassions(false));
        dispatch(userActions.userEditPress(false));
      }}
      style={[
        styles.constent,
        {
          backgroundColor: isEditTagline ? Colors.white : 'transparent',
          borderRadius: isEditTagline ? 20 : 0,
          paddingTop: isEditTagline ? hp(3.9) : 0,
          marginTop: !isEditTagline ? hp(3.9) : 0,
          elevation: isEditTagline ? 5 : 0,
        },
      ]}
    >
      {!isEditTagline ? (
        <>
          <LabelContainer>
            <LabelText
              style={{ color: LabelTextColor, fontWeight: '600', fontFamily: fontFamily.rf_regular, letterSpacing: 0.01, fontSize: fontSize(11) }}
            >
              Tagline
            </LabelText>
            <EditButton onPress={onEditButtonPress} disabled={isUserEditing || isEditing}>
              <SvgIcon height={16} name="pencil" color={Colors.greyish3} />
            </EditButton>
          </LabelContainer>
          <TaglineText style={{ color: TaglineTextColor, fontFamily: fontFamily.rf_regular, marginBottom: 14 }}>{tagline}</TaglineText>
          <View style={[styles.separateView, { borderColor: borderStyle }]} />
        </>
      ) : (
        <>
          {/* <View style={styles.pencilContent}>
            <SvgIcon height={13} name="pencil" color={Colors.greyish1} />
          </View> */}
          <Controller
            control={control}
            defaultValue=""
            name="tagline"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCompleteType="name"
                containerStyle={styles.textInput}
                label="Tagline"
                maxLength={remoteConfig().getValue('taglineLength').asNumber()}
                multiline
                // numberOfLines={4}
                numberRemainingCharactersShown
                onBlur={onBlur}
                onChangeText={onChange}
                // required
                textAlignVertical="top"
                textContentType="name"
                value={value ?? ''}
                textInputStyle={{ borderBottomWidth: 1, borderBottomColor: Colors.greyish28 }}
                style={styles.textInputContent}
                lebleStyle={{ paddingBottom: 16 }}
                keyboardType={Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'}
              />
            )}
          />
          {errorMessage ? <ErrorMessage containerStyle={styles.errorMessage}>{errorMessage}</ErrorMessage> : null}
          <ButtonsContainer style={{ marginBottom: hp(1.5), marginTop: hp(2.6) }}>
            <FlatButton
              variant="outline1"
              title="Cancel"
              containerStyle={styles.cancelButton}
              onPress={onCancelButtonPress}
              titleStyle={styles.cancelButtonText}
            />
            <FlatButton
              variant="solid1"
              title="Save"
              containerStyle={styles.saveButton}
              titleStyle={styles.saveButtonText}
              onPress={handleSubmit(onSaveButtonPress)}
            />
          </ButtonsContainer>
        </>
      )}
      {/* <View style={[styles.separateView, { borderColor: borderStyle }]} /> */}
    </View>
  );
};

export default TextTagline;
