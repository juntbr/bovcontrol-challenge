import React, {useState} from 'react';
import {TextInputProps, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Container, TextInput} from './styles';

interface InputProps extends Omit<TextInputProps, 'placeholderTextColor'> {
  error?: boolean;
  marginBottom?: number;
  options: string[];
  value: number;
  onChangeText: (value: string) => void;
}

export const Select: React.FC<InputProps> = ({
  options = [],
  error = false,
  value,
  onChangeText,
}) => {
  return (
    <Container>
      <Picker
        selectedValue={value}
        style={{
          height: 94,
          width: '100%',
          marginBottom: 50,
        }}
        itemStyle={{height: 94, backgroundColor: 'transparent'}}
        mode="dropdown"
        onValueChange={(itemValue: number) => onChangeText(itemValue)}>
        {options &&
          options.map((option, index) => (
            <Picker.Item label={option} value={option} />
          ))}
      </Picker>
    </Container>
  );
};
