/* eslint-disable no-alert */
/* eslint-disable curly */
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Input, Select, Button} from '@/presentation/components';
import Header from '@/presentation/components/Header';
import {NewFarmCreation} from '@/domain/usecases/new-farm-creation';
import {Container, Block, SelectInfoText, ScrollContainer} from './styles';
import {ScrollView} from 'react-native';
import objectMap from '@/presentation/utils/objectMap';
import {useAsyncStorage} from '@/presentation/context/async-storage-context';

type RegisterProps = {
  newfarmcreation?: NewFarmCreation;
  validation: any;
};

const defaultValue = {
  farmerName: false,
  cityFromFarm: false,
  milkQuantity: false,
  farmName: false,
};

export const NewFarm: React.FC<RegisterProps> = ({validation}) => {
  const {goBack} = useNavigation();
  const {saveDataToAsyncStorage} = useAsyncStorage();
  const [farmerName, setFarmerName] = useState<any>();
  const [cityFromFarm, setCityFromFarm] = useState<any>();
  const [hadSupervision, setHadSupervision] = useState<any>('Não');
  const [checkListType, setChecklistType] = useState<any>('BPA');
  const [milkQuantity, setMilkQuantity] = useState<any>();
  const [farmName, setFarmName] = useState<any>();
  const [loading, setLoading] = React.useState(false);
  const [error] = React.useState<string | undefined>();
  const [validationError, setValidationError] =
    React.useState<any>(defaultValue);

  const {onSubmit} = useForm(
    loading,
    error,
    setLoading,
    checkListType,
    milkQuantity,
    farmName,
    cityFromFarm,
    farmerName,
    hadSupervision,
    saveDataToAsyncStorage,
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
    <Container>
      <Header title="Crie sua Fazenda" isGoBackAvaiable />
      <ScrollView>
        <ScrollContainer>
          <Block>
            <Input
              value={farmerName}
              onChangeText={setFarmerName}
              placeholder="Nome do Fazendeiro"
              marginBottom={16}
              error={validationError.farmerName}
              testID="name-input"
            />
            <Input
              value={farmName}
              onChangeText={setFarmName}
              error={validationError.farmName}
              placeholder="Nome da Fazenda"
              marginBottom={16}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Block>
          <Block>
            <SelectInfoText>Tipo do Checklist</SelectInfoText>
            <Select
              options={['BPA', 'Antibiótico', 'BPF']}
              value={checkListType}
              onChangeText={setChecklistType}
              placeholder="Tipo do checklist"
              marginBottom={16}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Block>
          <Block>
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
              value={milkQuantity}
              onChangeText={text =>
                handleOnlyNumbersInput(setMilkQuantity, text)
              }
              placeholder="QTD de leite/mês"
              marginBottom={16}
              error={validationError.milkQuantity}
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Block>
          <Block>
            <SelectInfoText>Teve Supervisão?</SelectInfoText>
            <Select
              options={['Sim', 'Não']}
              value={hadSupervision}
              onChangeText={setHadSupervision}
              placeholder="Tipo do checklist"
              marginBottom={16}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Block>
        </ScrollContainer>
      </ScrollView>
      <Button
        title="Cadastrar"
        testID="submit"
        marginTop={16}
        onPress={onSubmit}
        loading={loading}
      />
    </Container>
  );
};

function useForm(
  loading: boolean,
  error: string | undefined,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  checkListType: any,
  milkQuantity: any,
  farmName: any,
  cityFromFarm: any,
  farmerName: any,
  hadSupervision: any,
  saveDataToAsyncStorage: (value: any) => void,
  goBack: () => void,
  validation: any,
  setValidationError: React.Dispatch<any>,
) {
  const validateFields = () => {
    let isError = false;
    const buildObject = {farmerName, cityFromFarm, milkQuantity, farmName};
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
    setValidationError(newValidationErrorObject);
    return isError;
  };

  const onSubmit = () => {
    const hasError = validateFields();
    if (hasError) return;
    if (loading || error) return;
    const randomId = Math.floor(Math.random() * 100000);

    try {
      setLoading(true);
      const newFarmObject = {
        _id: randomId,
        type: checkListType,
        amount_of_milk_produced: parseInt(milkQuantity, 10),
        farmer: {
          name: farmName,
          city: cityFromFarm,
        },
        from: {
          name: farmerName,
        },
        to: {
          name: farmerName,
        },
        number_of_cows_head: 1000,
        had_supervision: hadSupervision === 'Sim' ? true : false,
        location: {
          latitude: -13.004557745339769,
          longitude: -38.50708007812501,
        },
        created_at: new Date(),
        updated_at: new Date(),
      };

      saveDataToAsyncStorage(newFarmObject);
      goBack();
    } catch (e) {
      alert((e as Error).message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return {onSubmit};
}
