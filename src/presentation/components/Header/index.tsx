import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {
  Container,
  HeaderTitle,
  GoBackButton,
  TransparentView,
  GoBackButtonText,
} from './styles';

type HeaderProps = {
  title: string;
  isGoBackAvaiable: boolean;
};

const Header: React.FC<HeaderProps> = ({title, isGoBackAvaiable = true}) => {
  const {goBack} = useNavigation();

  return (
    <Container testID="header-container">
      <RenderGoBackButton goBack={goBack} isGoBackAvaiable={isGoBackAvaiable} />
      <HeaderTitle>{title}</HeaderTitle>
      <TransparentView />
    </Container>
  );
};

const RenderGoBackButton = ({goBack, isGoBackAvaiable}) => {
  if (!isGoBackAvaiable) {
    return <View style={{width: 40}} />;
  }
  return (
    <GoBackButton onPress={goBack}>
      <GoBackButtonText>{'<'}</GoBackButtonText>
    </GoBackButton>
  );
};

export default Header;
