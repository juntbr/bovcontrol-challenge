import React, {useState} from 'react';
import {Button, Input} from '@/presentation/components';
import {Block, ModalContentContainer, SelectInfoText} from './styles';
import {useAsyncStorage} from '@/presentation/context/async-storage-context';
import {FarmModel} from '@/domain/models';
import {useNavigation} from '@react-navigation/native';
import objectMap from '@/presentation/utils/objectMap';

type ModalContentProps = {
  farm: FarmModel;
  handleIsModalOpen(): void;
  validation: any;
};

const defaultValue = {
  farmerName: false,
  cityFromFarm: false,
  milkQuantity: false,
  farmName: false,
  cowQuantity: false,
};
export const ModalContent: React.FC<ModalContentProps> = ({
  farm,
  handleIsModalOpen,
  validation,
}) => {
  const {editDataFromAsyncStorage} = useAsyncStorage();
  const [farmerName, setFarmerName] = useState<any>();
  const [cityFromFarm, setCityFromFarm] = useState<any>();
  const [milkQuantity, setMilkQuantity] = useState<any>();
  const [cowQuantity, setCowQuantity] = useState<any>();
  const [farmName, setFarmName] = useState<any>();
  const {goBack} = useNavigation();
  const [validationError, setValidationError] =
    React.useState<any>(defaultValue);

  const {onSubmit} = useForm(
    farmName,
    cityFromFarm,
    milkQuantity,
    cowQuantity,
    farmerName,
    editDataFromAsyncStorage,
    farm,
    handleIsModalOpen,
    goBack,
    validation,
    setValidationError,
  );

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
          error={validationError.cityFromFarm}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          value={farmName}
          onChangeText={setFarmName}
          error={validationError.farmName}
          placeholder="Nome da fazenda"
          marginBottom={16}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          value={farmerName}
          error={validationError.farmerName}
          onChangeText={setFarmerName}
          placeholder="Nome do fazendeiro"
          marginBottom={16}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Block>
      <Block>
        <SelectInfoText>Dados de quantidade</SelectInfoText>
        <Input
          value={milkQuantity}
          error={validationError.milkQuantity}
          onChangeText={text => handleOnlyNumbersInput(setMilkQuantity, text)}
          placeholder="QTD de leite/mês"
          marginBottom={16}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          value={cowQuantity}
          error={validationError.cowQuantity}
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
function useForm(
  farmName: string,
  cityFromFarm: string,
  milkQuantity: string,
  cowQuantity: string,
  farmerName: string,
  editDataFromAsyncStorage: (farmId: String, editedData: FarmModel) => void,
  farm: FarmModel,
  handleIsModalOpen: () => void,
  goBack: () => void,
  validation: any,
  setValidationError: any,
) {
  const onSubmit = async () => {
    const hasError = validateFields();
    console.log(hasError);
    if (hasError) {
      return;
    }

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

  const validateFields = () => {
    let isError = false;
    const buildObject = {
      farmerName,
      cityFromFarm,
      milkQuantity,
      farmName,
      cowQuantity,
    };
    const newValidationErrorObject = objectMap(
      buildObject,
      (fieldvalue: unknown, fieldname: string) => {
        const isValidationError = validation?.validate(fieldname, {
          [fieldname]: fieldvalue,
        });
        if (isValidationError) {
          isError = true;
          return true;
        }
        return false;
      },
    );
    console.log(newValidationErrorObject);
    setValidationError(newValidationErrorObject);
    return isError;
  };
  return {onSubmit};
}
