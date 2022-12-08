import {colors} from '@/presentation/global/colors';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const Block = styled.View`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  margin-top: 16px;
  padding: 16px;
`;

export const SelectInfoText = styled.Text`
  font-size: 16px;
  margin-bottom: 24px;
  color: ${colors.text};
`;

export const ScrollContainer = styled.View`
  width: 100%;
  align-items: center;
`;
