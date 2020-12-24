import api from '../services/api';
import useCustomToasts from './toasts';

interface IApiCallProps {
  email: string;
  username: string;
  password: string;
}

export default function useCreateAccount() {
  const { addSuccessToast, addErrorToast } = useCustomToasts();
  async function apiCall({
    email,
    username,
    password,
  }: IApiCallProps): Promise<void> {
    try {
      await api.post('/users', { email, password, username });
    } catch (err) {
      addErrorToast(err.response.data.message);
      return;
    }
    addSuccessToast(
      'Conta criada com sucesso, você já pode fazer login na aplicação',
    );
  }
  return { apiCall };
}
