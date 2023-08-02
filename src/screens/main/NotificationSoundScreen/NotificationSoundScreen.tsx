import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import FlatButton from '../../../components/forms/FlatButton';
import OptionItem from './components/OptionItem';
import styles from './styles';
import VolumeItem from './components/VolumeItem';
import { hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import { actions as userActions } from '../../../ducks/user';
import SvgIcon from '../../../components/common/SvgIcon';
import GeneralPreloader from '../../../components/preloaders/GeneralPreloader';

const options: { key: string; label: string; url: string }[] = [
  { key: 'sound0', label: 'Off', url: '' },
  { key: 'sound1', label: 'water_5', url: require('../../../../assets/sounds/water_5.wav') },
  { key: 'sound2', label: 'kindersurprise_6', url: require('../../../../assets/sounds/kindersurprise_6.wav') },
  { key: 'sound3', label: 'analog_lab_sinus_8_2', url: require('../../../../assets/sounds/analog_lab_sinus_8_2.wav') },
  { key: 'sound4', label: 'analog_lab_dream_8_5', url: require('../../../../assets/sounds/analog_lab_dream_8_5.wav') },
];

const notificationVolume: { key: string; label: string }[] = [
  { key: '1', label: 'Low' },
  { key: '2', label: 'Default' },
  { key: '3', label: 'Loud' },
  // { key: '4', label: 'Loudest' },
];

const NotificationSoundScreen = () => {
  const { data: user, loading } = useAppSelector((state) => state.user);
  const [showRight, setShowRight] = useState<boolean>(false);

  const [impression, setImpression] = useState<string>('sound0');
  const [volume, setVolume] = useState<string>('2');
  const dispatch = useAppDispatch();

  useEffect(() => {
    loading &&
      setTimeout(() => {
        setShowRight(false);
      }, 2500);
  }, [loading]);

  let isButtonDisable = true;
  if (user?.soundFileId === null) {
    isButtonDisable = impression === 'sound0';
  } else {
    isButtonDisable = impression === user?.soundFileId;
  }

  useEffect(() => {
    const updatefile = user?.soundFileId ? user?.soundFileId : 'sound0';
    setImpression(updatefile);
  }, []);

  const onPressApply = () => {
    setShowRight(true);
    dispatch(userActions.updateUserStatusRequest({ soundFileId: impression }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Sound settings'}</Text>
      <View style={styles.contentContainer}>
        {options.map((item, key) => {
          return (
            <OptionItem
              key={key}
              isSelected={item.key === impression}
              title={item.label}
              onPress={() => {
                if (item?.url) {
                  var Sound = require('react-native-sound');
                  Sound.setCategory('Playback');
                  var audio = new Sound(item?.url, (error) => {
                    if (error) {
                      console.log('failed to load the sound', error);
                      return;
                    }
                    // if loaded successfully
                    audio.play((success) => {
                      if (success) {
                        audio.release();
                      } else {
                        console.log('playback failed due to audio decoding errors');
                      }
                    });
                  });
                }
                setImpression(item.key);
              }}
              index={key}
              lastIndex={options.length - 1}
            />
          );
        })}
      </View>
      {/* <Text style={styles.titleSub}>{'Notification volume'}</Text>
      <View style={styles.Container}>
        {notificationVolume.map((item, key) => {
          return (
            <VolumeItem
              key={key}
              isSelected={item.key === volume}
              title={item.label}
              onPress={() => setVolume(item.key)}
              index={key}
              lastIndex={notificationVolume.length - 1}
            />
          );
        })}
      </View> */}

      <TouchableOpacity
        style={isButtonDisable ? (showRight ? styles.applyMainContent : styles.disableButton) : styles.applyMainContent}
        onPress={() => onPressApply()}
        disabled={isButtonDisable}
      >
        {loading ? (
          <GeneralPreloader containerStyle={{ height: hp(2) }} color={Colors.white} />
        ) : showRight ? (
          <SvgIcon name={'right-icon'} height={13} style={styles.contentBodyIcon} color={Colors.white} />
        ) : (
          <Text style={styles.applyText}>{'Apply'}</Text>
        )}
        {/* <SvgIcon name={'right-icon'} height={12} style={styles.contentBodyIcon} color={Colors.white} /> */}
      </TouchableOpacity>
    </View>
  );
};

export default NotificationSoundScreen;
