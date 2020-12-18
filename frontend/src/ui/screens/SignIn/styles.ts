import styled from 'styled-components';
import signInBackground from '../../../assets/Images/SignInImage.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  img {
    max-width: 100%;
    height: 180px;
    margin-bottom: 20px;
  }

  h1 {
    color: white;
    font-weight: 700;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 30px;
    align-items: center;
    justify-content: center;
    width: 500px;

    div + div {
      margin-top: 20px;
    }

    button {
      margin-top: 20px;
    }
  }

  > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 16px;
    transition: all 0.2s;
    margin-top: 24px;
    color: #02d361;

    &:hover {
      opacity: 0.7;
    }

    svg {
      margin-left: 10px;
    }
  }
`;

export const SideBackground = styled.div`
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
  flex: 1;
`;
