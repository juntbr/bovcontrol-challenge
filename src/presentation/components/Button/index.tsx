import React from 'react';
import {Spinner} from '../Spinner';
import {Container, Text} from './styles';

interface ButtonProps {
  title: string;
  marginTop?: number;
  testID?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  marginTop,
  disabled,
  testID,
  onPress,
  loading,
}) => {
  return (
    <Container
      style={{marginTop}}
      testID={testID}
      disabled={disabled}
      onPress={onPress}>
      {loading ? <Spinner visible={true} /> : <Text>{title}</Text>}
    </Container>
  );
};
