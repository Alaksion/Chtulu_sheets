import React, { useCallback } from 'react';
import { FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Content,
  HeaderLogoContent,
  NavigateBackButton,
  HeaderProfileContent,
  HeaderProfileImageButton,
} from './styles';
import { useAuth } from '../../../context/authContext';
import HeaderLogo from '../../../assets/Images/HeaderLogo.png';

interface IHeaderProps {
  isGoBackButton?: boolean;
}

const Header: React.FC<IHeaderProps> = ({ isGoBackButton }) => {
  const { user, resetUserData } = useAuth();
  const navigation = useHistory();

  const logout = useCallback(() => {
    resetUserData();
    navigation.push('/');
  }, [navigation, resetUserData]);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <Content>
        <HeaderLogoContent>
          <img src={HeaderLogo} alt="Logotipo da aplicação" />

          <>
            {isGoBackButton && (
              <NavigateBackButton onClick={navigateBack}>
                <FiArrowLeft size={20} />
                <span>Voltar</span>
              </NavigateBackButton>
            )}
          </>
        </HeaderLogoContent>

        <HeaderProfileContent>
          <FiLogOut size={30} onClick={logout} />

          <HeaderProfileImageButton>
            <span>{user.username}</span>
            <img
              src={user.avatarUrl}
              alt={`Foto do usuário ${user.username}`}
            />
          </HeaderProfileImageButton>
        </HeaderProfileContent>
      </Content>
    </Container>
  );
};

export default Header;
