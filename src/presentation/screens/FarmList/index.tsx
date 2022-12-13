import {FarmModel} from '@/domain/models';
import {LoadFarmList} from '@/domain/usecases';
import {Spinner} from '@/presentation/components';
import Header from '@/presentation/components/Header';
import FarmCard from '@/presentation/components/FarmCard';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ButtonText,
  Container,
  Content,
  CreateButton,
  ButtonContainer,
} from './styles';
import {useAsyncStorage} from '@/presentation/context/async-storage-context';
import {View} from 'react-native';

type FarmList = {
  loadFarmList?: LoadFarmList;
};

const FarmListScreen: React.FC<FarmList> = () => {
  const {navigate} = useNavigation();
  const {farmList} = useAsyncStorage();
  // const handleError = useErrorHandler(error => setError(error));
  const [loading] = useState(false);
  // const [setError] = useState<Error>(null as unknown as Error);

  // function renderError() {
  //   return <ErrorComponent message={error?.message} onPress={x => x} />;
  // }

  const handleFarmPress = (farm: FarmModel) => {
    //@ts-ignore
    navigate('FarmDetails', {
      farm,
    });
  };

  return (
    <Container>
      <Spinner visible={loading} />
      <Header title="Fazendas" isGoBackAvaiable={false} />
      <ButtonContainer>
        <View />
        <CreateButton
          onPress={() => {
            navigate('NewFarm');
          }}>
          <ButtonText>+</ButtonText>
        </CreateButton>
      </ButtonContainer>
      <Content>
        {farmList?.map((item, index) => {
          if (item?._id) {
            return (
              <FarmCard
                testID={`farm-item-${index}`}
                key={item._id}
                data={{
                  name: item.farmer.name,
                  city: item.farmer.city,
                  type: item.type,
                  creationDate: item.created_at,
                }}
                onPress={() => handleFarmPress(item as FarmModel)}
              />
            );
          }
        })}
      </Content>
    </Container>
  );
};

export default FarmListScreen;
