import styled, { css } from 'styled-components';
import { appColors } from '../../../globalStyles';
import Tooltip from '../Tooltip';

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
  isError: boolean;
}

export const Container = styled.div<InputProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232120;
  padding: 16px;
  width: 100%;
  color: ${appColors.grey};
  display: flex;
  align-items: center;
  transition: all 0.2s;

  ${props =>
    props.isError &&
    css`
      border-color: ${appColors.error_red};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${appColors.green};
      color: ${appColors.green};
    `}

  ${props =>
    props.isFilled &&
    css`
      svg {
        color: ${appColors.green};
      }
    `}

    & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 15px;
  }

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #f4ede8;
    font-size: 16px;

    &::placeholder {
      color: ${appColors.grey};
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: white;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
