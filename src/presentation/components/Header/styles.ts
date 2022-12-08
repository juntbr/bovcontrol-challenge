import styled from 'styled-components/native';
import {colors} from '@/presentation/global/colors';

export const Container = styled.View`
  padding: 8px;
  margin-bottom: 20px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

export const GoBackButton = styled.TouchableOpacity`
  background-color: ${colors.bovControl.other}
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  height: 40px;
  width: 40px;
`;

export const GoBackButtonText = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

export const TransparentView = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
`;
