/* eslint-disable react-hooks/exhaustive-deps */
import {FarmModel} from '@/domain/models';
import {LoadFarmList} from '@/domain/usecases';
import Header from '@/presentation/components/Header';
import FarmCard from '@/presentation/components/FarmCard';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ButtonText,
  Container,
  Content,
  CreateButton,
  ButtonContainer,
  SkeletonContainer,
} from './styles';
import {useAsyncStorage} from '@/presentation/context/async-storage-context';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type FarmList = {
  loadFarmList?: LoadFarmList;
};

const FarmListScreen: React.FC<FarmList> = () => {
  const {navigate} = useNavigation();
  const {
    farmList,
    syncCreatedListWithRemote,
    syncEditedListWithRemote,
    isLoading,
  } = useAsyncStorage();
  // const handleError = useErrorHandler(error => setError(error));
  // const [setError] = useState<Error>(null as unknown as Error);

  // function renderError() {
  //   return <ErrorComponent message={error?.message} onPress={x => x} />;
  // }

  console.log({isLoading});
  useFocusEffect(
    React.useCallback(() => {
      syncCreatedListWithRemote();
      syncEditedListWithRemote();

      return () => {};
    }, []),
  );

  const handleFarmPress = (farm: FarmModel) => {
    //@ts-ignore
    navigate('FarmDetails', {
      farm,
    });
  };

  if (isLoading) {
    return (
      <Container>
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
          <SkeletonContainer>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item
                  width={40}
                  marginLeft={8}
                  height={40}
                  borderRadius={40}
                />
                <SkeletonPlaceholder.Item marginLeft={16} marginTop={8}>
                  <SkeletonPlaceholder.Item width={280} height={15} />
                  <SkeletonPlaceholder.Item
                    marginTop={8}
                    width={280}
                    height={15}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </SkeletonContainer>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
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
