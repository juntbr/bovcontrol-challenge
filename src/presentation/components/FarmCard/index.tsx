import React from 'react';
import {View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  Container,
  Title,
  City,
  TextContainer,
  TokenContainer,
  TokenText,
} from './styles';
import {colors} from '@/presentation/global/colors';
import {returnDateFormated} from '@/presentation/utils/returnDateFormated';
type FarmCardProps = {
  data: {
    name: string;
    city: string;
    type: string;
    creationDate: Date;
  };
  testID: string;
  onPress: () => void;
};

const colorsRandomArray = [
  colors.bovControl.primary,
  colors.bovControl.secondary,
  colors.bovControl.other,
];

const FarmCard: React.FC<FarmCardProps> = ({data, onPress, testID}) => {
  const returnInitials = (name: string) => {
    const initialLetters = name.slice(0, 2);

    return initialLetters.toUpperCase();
  };

  const returnRandomColor = (length: any) => {
    const random = Math.floor(Math.random() * length);

    return colorsRandomArray[random];
  };

  return (
    <Container testID={testID} onPress={onPress}>
      <Avatar
        rounded
        title={returnInitials(data?.name)}
        overlayContainerStyle={{
          backgroundColor: returnRandomColor(colorsRandomArray.length),
        }}
        icon={{name: 'meetup', color: 'red', type: 'font-awesome'}}
        containerStyle={{marginRight: 8}}
      />
      <TextContainer>
        <Title testID="farm-card-title">{data?.name}</Title>
        <City>{data?.city}</City>
      </TextContainer>
      <View>
        <City>{returnDateFormated(data?.creationDate)}</City>
        <TokenTag text={data.type} />
      </View>
    </Container>
  );
};

const TokenTag: React.FC<{text: string}> = ({text}) => {
  return (
    <TokenContainer>
      <TokenText>{text}</TokenText>
    </TokenContainer>
  );
};
export default FarmCard;
