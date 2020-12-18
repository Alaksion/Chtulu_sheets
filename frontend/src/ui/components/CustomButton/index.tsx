import React, { ButtonHTMLAttributes } from 'react';
import ReactLoading from 'react-loading';
import { Container } from './styles';
import { appColors } from '../../../globalStyles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  texto: string;
}

const CustomButton: React.FC<IButtonProps> = ({ texto, loading, ...rest }) => {
  return (
    <Container type="button" isLoading={loading} {...rest} disabled={loading}>
      {loading && (
        <ReactLoading
          color={appColors.grey}
          type="spin"
          height={30}
          width={30}
        />
      )}

      {!loading && <span>{texto}</span>}
    </Container>
  );
};

export default CustomButton;
