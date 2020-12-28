import styled from 'styled-components';
import { shade } from 'polished';
import { appColors } from '../../../globalStyles';

export const Container = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${appColors.darkGrey};
  position: absolute;
  top: 0;
`;

export const Content = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: row;
  margin: auto;
  align-items: center;
`;

export const HeaderLogoContent = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;

  span {
    color: white;
    font-size: 22px;
    font-weight: 700;
  }
`;

export const NavigateBackButton = styled.button`
  background: transparent;
  border: 0;
  display: flex;
  align-items: center;

  svg {
    color: white;
    margin-left: 40px;
    margin-right: 10px;
  }

  span {
    color: white;
    font-size: 16px;
    font-weight: 700;
  }
`;

export const HeaderProfileContent = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    color: white;
    margin-right: 40px;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      color: ${shade(0.2, '#FFF')};
    }
  }
`;

export const HeaderProfileImageButton = styled.button`
  background: transparent;
  border: 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    border: 2px solid ${appColors.green};
  }

  span {
    color: white;
    font-size: 16px;
    font-weight: 700;
    margin-right: 30px;
  }
`;
