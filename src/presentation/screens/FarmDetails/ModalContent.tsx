import React, {useState} from 'react';
import {Button, Input} from '@/presentation/components';
import {Block, ModalContentContainer, SelectInfoText} from './styles';
import {useAsyncStorage} from '@/presentation/context/async-storage-context';
import {FarmModel} from '@/domain/models';
import {useNavigation} from '@react-navigation/native';

type ModalContentProps = {
  farm: FarmModel;
  handleIsModalOpen(): void;
};

export const ModalContent: React.FC<ModalContentProps> = ({
  farm,
  handleIsModalOpen,
}) => {
  const {editDataFromAsyncStorage} = useAsyncStorage();
  const [farmerName, setFarmerName] = useState<any>();
  const [cityFromFarm, setCityFromFarm] = useState<any>();
  const [milkQuantity, setMilkQuantity] = useState<any>();
  const [cowQuantity, setCowQuantity] = useState<any>();
  const [farmName, setFarmName] = useState<any>();
  const {goBack} = useNavigation();

  const onSubmit = async () => {
    const editedFarm = {
      farmer: {
        name: farmName,
        city: cityFromFarm,
      },
      milk_quantity: milkQuantity,
      cow_quantity: cowQuantity,
      from: {
        name: farmerName,
      },
    };

    try {
      editDataFromAsyncStorage(farm._id, editedFarm);
    } catch {
      console.log('error');
    } finally {
      handleIsModalOpen();
      goBack();
    }
  };

  const handleOnlyNumbersInput = (
    setText: React.Dispatch<React.SetStateAction<string>>,
    text: string,
  ) => {
    setText(text.replace(/[^0-9]/g, ''));
  };

  return (
    <ModalContentContainer>
      <Block>
        <SelectInfoText>Informações da fazenda</SelectInfoText>
        <Input
          value={cityFromFarm}
          onChangeText={setCityFromFarm}
          placeholder="Cidade da Fazenda"
          marginBottom={16}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          value={farmName}
          onChangeText={setFarmName}
          placeholder="Nome da fazenda"
          marginBottom={16}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          value={farmerName}
          onChangeText={setFarmerName}
          placeholder="Nome do fazendeiro"
          marginBottom={16}
          testID="email-input"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Block>
      <Block>
        <SelectInfoText>Dados de quantidade</SelectInfoText>
        <Input
          value={milkQuantity}
          onChangeText={text => handleOnlyNumbersInput(setMilkQuantity, text)}
          placeholder="QTD de leite/mês"
          marginBottom={16}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          value={cowQuantity}
          onChangeText={text => handleOnlyNumbersInput(setCowQuantity, text)}
          placeholder="Quantidade de bois"
          marginBottom={16}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Block>
      <Button title="Salvar informações" marginTop={16} onPress={onSubmit} />
    </ModalContentContainer>
  );
};
