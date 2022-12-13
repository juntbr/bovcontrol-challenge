/* eslint-disable curly */
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Input, ErrorMessage, Select, Button} from '@/presentation/components';
import Header from '@/presentation/components/Header';
import {NewFarmCreation} from '@/domain/usecases/new-farm-creation';
import {Container, Block, SelectInfoText, ScrollContainer} from './styles';
import {ScrollView} from 'react-native';
import {useAsyncStorage} from '@/presentation/context/async-storage-context';

type RegisterProps = {
  newfarmcreation?: NewFarmCreation;
};

export const NewFarm: React.FC<RegisterProps> = () => {
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
  const [registrationError] = React.useState<string | undefined>();

  async function onSubmit() {
    const randomId = Math.floor(Math.random() * 1000);

    if (loading || error) return;
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

      await saveDataToAsyncStorage(newFarmObject);
      goBack();
    } catch (e) {
      alert((e as Error).message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const handleOnlyNumbersInput = (
    setText: React.Dispatch<React.SetStateAction<string>>,
    text: string,
  ) => {
    setText(text.replace(/[^0-9]/g, ''));
  };

  return (
    <Container testID="register-container">
      <Header title="Crie sua Fazenda" isGoBackAvaiable />
      {/* <Spinner visible={loading} /> */}
      <ScrollView>
        <ScrollContainer>
          <Block>
            <Input
              value={farmerName}
              onChangeText={setFarmerName}
              placeholder="Nome do Fazendeiro"
              marginBottom={16}
              testID="name-input"
            />
            <Input
              value={farmName}
              onChangeText={setFarmName}
              placeholder="Nome da Fazenda"
              marginBottom={16}
              testID="email-input"
              keyboardType="email-address"
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
              testID="email-input"
              keyboardType="email-address"
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
              testID="email-input"
              keyboardType="email-address"
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
              testID="email-input"
              keyboardType="email-address"
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
              testID="email-input"
              keyboardType="email-address"
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
      <ErrorMessage error={registrationError || error} />
    </Container>
  );
};

//
