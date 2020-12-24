import React, { useRef, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiChevronLeft, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CustomButton from 'ui/components/CustomButton';
import * as Yup from 'yup';
import { Container, Content, SideBackground } from './styles';
import CustomInput from '../../components/CustomInput';
import useCreateAccount from '../../../hooks/useCreateAccount';
import ValidationErrors from '../../../utils/ValidationErrors';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { apiCall } = useCreateAccount();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('E-mail inválido')
            .required('Campo e-mail é obrigatório'),
          password: Yup.string()
            .required('Campo senha é obrigatório')
            .min(10, 'Senha deve ter no mínimo 10 caracteres'),
          username: Yup.string().required(
            'Campo nome de usuário é obrigatório',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (err) {
        const erros = ValidationErrors(err);

        formRef.current?.setErrors(erros);
        return;
      }

      setButtonLoading(true);

      await apiCall({
        email: data.email,
        password: data.password,
        username: data.username,
      });
    },
    [apiCall],
  );

  return (
    <Container>
      <SideBackground />

      <Content>
        <h1>Crie sua conta</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <CustomInput
            name="username"
            icon={FiUser}
            placeholder="Digite seu nome de usuário"
          />

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

          <CustomButton
            texto="Criar conta"
            loading={buttonLoading}
            type="submit"
          />
        </Form>

        <Link to="/">
          <FiChevronLeft size={25} />
          Voltar ao login
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
