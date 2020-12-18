import React, { useRef, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CustomButton from 'ui/components/CustomButton';
import * as Yup from 'yup';
import { Container, Content, SideBackground } from './styles';
import CustomInput from '../../components/CustomInput';
import useAuth from '../../../hooks/auth';
import useCustomToasts from '../../../hooks/toasts';
import ValidationErrors from '../../../utils/ValidationErrors';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { login } = useAuth();
  const { addErrorToast } = useCustomToasts();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('E-mail inválido')
            .required('Campo e-mail é obrigatório'),
          password: Yup.string().required('Campo senha é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (err) {
        const erros = ValidationErrors(err);

        formRef.current?.setErrors(erros);
        setButtonLoading(false);
        return;
      }

      setButtonLoading(true);

      try {
        await login({ email: data.email, password: data.password });
      } catch (err) {
        addErrorToast(err.response.data.message);
      } finally {
        setButtonLoading(false);
      }
    },
    [login, addErrorToast],
  );

  return (
    <Container>
      <Content>
        <h1>Faça seu Login</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <CustomInput
            name="email"
            icon={FiMail}
            placeholder="Digite seu e-mail"
          />

          <CustomInput
            name="password"
            icon={FiLock}
            placeholder="Digite sua senha"
            type="password"
          />

          <CustomButton texto="Entrar" loading={buttonLoading} type="submit" />
        </Form>

        <Link to="/signup">
          Criar uma conta
          <FiLogIn size={25} />
        </Link>
      </Content>

      <SideBackground />
    </Container>
  );
};

export default SignIn;
