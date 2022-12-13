import {colors} from '@/presentation/global/colors';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
})`
  flex: 1;
  padding: 16px;
`;
export const SkeletonContainer = styled.TouchableOpacity`
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  padding: 16px;
  text-align: left;
  margin-bottom: 16px;
`;

export const CreateButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background: ${colors.bovControl.primary};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 28px;
  font-weight: 600;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  margin-bottom: 8px;
`;

export const List = styled.FlatList``;
