import styled from 'styled-components';
import { appColors } from '../../../globalStyles';

export const Container = styled.div`
  position: relative;
  display: flex;

  span {
    background: ${appColors.error_red};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: all 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    width: 200px;
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;
    text-align: center;

    &::before {
      border-style: solid;
      border-color: ${appColors.green} transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      content: '';
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
