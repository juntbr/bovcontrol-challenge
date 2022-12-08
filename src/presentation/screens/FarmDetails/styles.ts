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

export const ContentContainer = styled.View`
  flex: 1;
  margin-top: 8px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;
export const Subtitle = styled.Text`
  font-size: 12px;
`;

export const SelectInfoText = styled.Text<any>`
  font-size: 16px;
  margin-bottom: 8px;
  color: ${colors.text};
`;

export const ScrollContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const ModalContentContainer = styled.View`
  margin-top: 160px;
  border-radius: 8px;
  align-self: center;
  align-items: center;
  padding: 24px 8px;
  width: 90%;
  background-color: #e1eefb;
`;
