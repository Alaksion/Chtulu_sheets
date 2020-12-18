import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { appColors } from '../../../globalStyles';

interface IButtonProps {
  isLoading: boolean;
}

export const Container = styled.button<IButtonProps>`
  background: ${appColors.green};
  border-radius: 10px;
  border: 0;
  height: 50px;
  padding: 16px;
  width: 100%;
  color: #312e38;
  font-weight: 500;
  transition: all 0.2s;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${shade(0.2, `${appColors.green}`)};
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${props =>
    props.isLoading &&
    css`
      color: ${appColors.grey};
    `}
`;
