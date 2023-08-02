import React, { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

import LeftChevronButton from './components/LeftChevronButton';
import NavigationHelper from '../../../utils/NavigationHelper';
import { HeaderProps } from './types';
import { Container, TitleContainer, Title, ButtonContainer } from './styled';
import { headerStyles } from './data';

const Header = ({ leftChevronButtonShown = false, leftChevronButtonTitle, title, variant }: HeaderProps): JSX.Element => {
  const [titlePaddingRight, setTitlePaddingRight] = useState<number>(0);

  const onLayoutLeftButtonContainer = ({
    nativeEvent: {
      layout: { width },
    },
  }: LayoutChangeEvent) => {
    setTitlePaddingRight(width);
  };

  const onPressLeftChevronButton = () => {
    NavigationHelper.goBack();
  };

  return (
    <Container style={headerStyles[variant].container}>
      <TitleContainer>
        <ButtonContainer onLayout={onLayoutLeftButtonContainer}>
          {leftChevronButtonShown && (
            <LeftChevronButton
              title={leftChevronButtonTitle}
              onPress={onPressLeftChevronButton}
              color={headerStyles[variant].leftChevronButtonColor}
            />
          )}
        </ButtonContainer>
        <Title numberOfLines={1} style={[headerStyles[variant].title, { paddingRight: titlePaddingRight }]}>
          {/* {title} */}
        </Title>
      </TitleContainer>
    </Container>
  );
};

export default Header;
