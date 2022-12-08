/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
import React, {useState} from 'react';
import {ErrorMessage, Button} from '@/presentation/components';
import Header from '@/presentation/components/Header';
import {Validation} from '@/presentation/protocols/validation';
import {NewFarmCreation} from '@/domain/usecases/new-farm-creation';
import {
  Container,
  Block,
  SelectInfoText,
  ScrollContainer,
  Title,
  Subtitle,
  ContentContainer,
} from './styles';
import {ScrollView, Modal, View} from 'react-native';
import {ModalContent} from './ModalContent';
import {FarmModel} from '@/domain/models';
import {returnDateFormated} from '@/presentation/utils/returnDateFormated';

type RegisterProps = {
  validation: Validation;
  newfarmcreation: NewFarmCreation;
  route: {params: {farm: FarmModel}};
};

const HAD_SUPERVISION_TRUE_TEXT = 'SIM';
const HAD_SUPERVISION_FALSE_TEXT = 'NÃO';

export const FarmDetails: React.FC<RegisterProps> = ({route}) => {
  const [error] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {farm} = route.params;
  const HAD_SUPERVISION_TEXT = farm.had_supervision
    ? HAD_SUPERVISION_TRUE_TEXT
    : HAD_SUPERVISION_FALSE_TEXT;
  const [registrationError] = useState<string | undefined>();
  const opacityFromContainer = isModalOpen ? 0.05 : 1;

  const handleIsModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container
      testID="register-container"
      style={{opacity: opacityFromContainer}}>
      <Header title="Detalhes da sua fazenda" isGoBackAvaiable />
      <ScrollView>
        <ScrollContainer>
          <Block>
            <SelectInfoText>Informações da fazenda</SelectInfoText>
            <ContentContainer>
              <Title>Nome da fazenda</Title>
              <Subtitle>{farm.farmer.name}</Subtitle>
            </ContentContainer>
            <ContentContainer>
              <Title>Cidade</Title>
              <Subtitle>{farm.farmer.city}</Subtitle>
            </ContentContainer>
            <ContentContainer>
              <Title>Nome do fazendeiro</Title>
              <Subtitle>{farm.from.name}</Subtitle>
            </ContentContainer>
          </Block>
          <Block>
            <SelectInfoText>Dados básicos</SelectInfoText>
            <ContentContainer>
              <Title>Número de cabeças de gado</Title>
              <Subtitle>{farm.number_of_cows_head}</Subtitle>
            </ContentContainer>
            <ContentContainer>
              <Title>Tipo</Title>
              <Subtitle>{farm.type}</Subtitle>
            </ContentContainer>
            <ContentContainer>
              <Title>Quantidade de leite produzido/mês</Title>
              <Subtitle>{farm.amount_of_milk_produced} litros</Subtitle>
            </ContentContainer>
            <ContentContainer>
              <Title>Supervisionada</Title>
              <Subtitle>{HAD_SUPERVISION_TEXT}</Subtitle>
            </ContentContainer>
          </Block>
          <Block>
            <SelectInfoText>Histórico</SelectInfoText>
            <ContentContainer>
              <Title>Data de criação</Title>
              <Subtitle>{returnDateFormated(farm.created_at)}</Subtitle>
            </ContentContainer>
            <ContentContainer>
              <Title>Ultima atualização</Title>
              <Subtitle>{returnDateFormated(farm.updated_at)}</Subtitle>
            </ContentContainer>
          </Block>
        </ScrollContainer>
      </ScrollView>
      <Button
        title="Editar informações"
        marginTop={16}
        onPress={handleIsModalOpen}
      />
      <ErrorMessage error={registrationError || error} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={handleIsModalOpen}>
        <ModalContent farm={farm} handleIsModalOpen={handleIsModalOpen} />
      </Modal>
    </Container>
  );
};
