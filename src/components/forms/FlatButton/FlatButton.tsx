import React from 'react';

import SvgIcon from '../../common/SvgIcon';
import useButton from './useButton';
import { Container, Title } from './styled';
import { FlatButtonProps } from './types';
import GeneralPreloader from '../../preloaders/GeneralPreloader';
import { fontFamily } from '../../../utils/functions';
import { fontSize } from '../../../styles/metrics';

const FlatButton = (props: FlatButtonProps): JSX.Element => {
  const { title, loading, titleStyle: titleTextStyle, titleStyle1 } = props;

  const { getAcitivityIndicatorProps, getContainerProps, getLeftIconProps, showLeftIcon, showRightIcon, getRightIconProps } = useButton(props);

  return (
    <Container {...getContainerProps()}>
      {loading ? (
        <GeneralPreloader {...getAcitivityIndicatorProps()} />
      ) : (
        <>
          {showLeftIcon && <SvgIcon {...getLeftIconProps()} />}
          <Title style={[titleTextStyle, titleStyle1]}>{title}</Title>
          {showRightIcon && <SvgIcon {...getRightIconProps()} />}
        </>
      )}
    </Container>
  );
};

export default FlatButton;
