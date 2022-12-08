import {colors} from '@/presentation/global/colors';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  width: 90%;
  align-self: center;
  height: 54px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.bovControl.other};
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
`;
