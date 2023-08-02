import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import { actions } from '../../../../../ducks/user';
import { DELETE_USER_CONFIRMATION_TEXT } from '../../../../../utils/constants';

export default () => {
  const [value, setValue] = useState<string>('');
  const isLoading = useAppSelector((state) => state.user.deletingUser.loading);
  const dispatch = useAppDispatch();

  const isModalShow = useAppSelector((state) => state.user.deletingUser.isModalShown);

  const onChangeText = (text: string) => setValue(text);

  const onOverlayPress = () => dispatch(actions.hideConfirmDeletingUserModal());

  const isButtonCollapsed = value.trim().toLocaleLowerCase() !== DELETE_USER_CONFIRMATION_TEXT.toLocaleLowerCase();

  // hide the modal before leaving the screen if it's shown
  useEffect(() => {
    const hideModal = () => {
      if (isModalShow) {
        dispatch(actions.hideConfirmDeletingUserModal());
      }
    };

    return () => hideModal();
  }, [isModalShow]);

  return {
    isLoading,
    isButtonCollapsed,
    isModalShow,
    value,
    onChangeText,
    onOverlayPress,
  };
};
