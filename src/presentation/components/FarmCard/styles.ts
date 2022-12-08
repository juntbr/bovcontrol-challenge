import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  padding: 16px;
  text-align: left;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

export const City = styled.Text`
  text-align: center;
  font-size: 12px;
  font-weight: 400;
`;

export const TextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-width: 0.5px;
  border-top-color: #eee;
`;

export const Icon = styled.View`
  width: 52px;
  height: 52px;
  margin-right: 20px;
  background: black;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: #f16605;
  font-weight: 500;
`;

export const TokenContainer = styled.View<any>`
  background-color: ${props => (props.primary ? 'white' : 'palevioletred')};
  height: 16px;
  width: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  margin-top: 4px;
`;

export const TokenText = styled.Text`
  color: white;
`;
