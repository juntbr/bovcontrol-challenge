import {colors} from '@/presentation/global/colors';
import {TextInput as RNTextInput} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 84px;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  border-radius: 4px;
`;

export const TextInput = styled(RNTextInput).attrs({
  placeholderTextColor: colors.lightText,
})`
  width: 100%;
  color: ${colors.text};
  padding: 0 16px;
`;
