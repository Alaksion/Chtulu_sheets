import styled from 'styled-components';
import { appColors } from '../../../globalStyles';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding-top: 80px;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 30px 80px 0 80px;
`;

export const NewCharacterButton = styled.button`
  height: 90%;
  width: 49%;
  border-radius: 10px 10px 0px 0px;
  transition: all 0.2s;
  background-color: ${appColors.darkGrey};
  border-bottom: 2px solid ${appColors.green};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-5px);
  }

  span {
    font-weight: 700;
    color: white;
    font-size: 26px;
    margin-right: 15px;
  }
`;

export const CharactersList = styled.div`
  height: 90%;
  width: 49%;
  background-color: ${appColors.darkGrey};
  border-bottom: 2px solid ${appColors.green};
  border-radius: 10px 10px 0px 0px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;
