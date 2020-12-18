import { createGlobalStyle } from 'styled-components';

export const appDefaults = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: Montserrat, sans-serif
  }

  body{
    background-color: #312E38;
  }

  button{
    cursor: pointer;

    &:focus{
      outline: 0
    }
  }

  input, button, body{
      font-size: 16px;
    }

`;

export const appColors = {
  green: '#02d361',
  error_red: '#c53030',
  grey: '#666360',
};
