/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import Step from './components/Step';
import { Container, HorizontalLine } from './styled';
import { StepperProps } from './types';

const Stepper = ({ activeStep, containerStyle, numberOfSteps }: StepperProps) => {
  const content = useMemo(() => {
    const result = [];

    for (let i = 0; i < numberOfSteps; i++) {
      if (i !== 0) {
        result.push(<HorizontalLine key={`hl_${i}`} />);
      }

      result.push(<Step label={`${i + 1}`} active={activeStep === i + 1} key={`st_${i}`} />);
    }
    return result;
  }, [activeStep, numberOfSteps]);

  return <Container style={containerStyle}>{content}</Container>;
};

export default Stepper;
