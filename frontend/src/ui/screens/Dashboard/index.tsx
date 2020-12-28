import React, { useCallback } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import {
  Container,
  Content,
  NewCharacterButton,
  CharactersList,
} from './styles';
import Header from '../../components/Header';
import CharacterCard from './CharacterCard';

const Dashboard: React.FC = () => {
  const handleClickNewCharacter = useCallback(() => {
    console.log('clicou');
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <NewCharacterButton onClick={handleClickNewCharacter}>
          <span>Criar novo personagem</span>
          <MdOpenInNew size={30} color="white" />
        </NewCharacterButton>

        <CharactersList>
          <CharacterCard character={{}} />
          <CharacterCard character={{}} />
          <CharacterCard character={{}} />
          <CharacterCard character={{}} />
          <CharacterCard character={{}} />
          <CharacterCard character={{}} />
          <CharacterCard character={{}} />
          <CharacterCard character={{}} />
          <CharacterCard character={{}} />
          <CharacterCard character={{}} />
        </CharactersList>
      </Content>
    </Container>
  );
};

export default Dashboard;
