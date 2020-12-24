import api from '../services/api';
import { useAuth } from '../context/authContext';
import useCustomToasts from './toasts';

interface ILoginData {
  email: string;
  password: string;
}

interface ILoginResponse {
  user: { id: string; username: string; email: string; avatarUrl: string };
  token: string;
}

const useLogin = () => {
  const { setUserData } = useAuth();
  const { addErrorToast } = useCustomToasts();

  async function login({ email, password }: ILoginData): Promise<void> {
    try {
      const response = await api.post<ILoginResponse>('login', {
        email,
        password,
      });
      api.defaults.headers.Authorization = response.data.token;
      setUserData({
        token: response.data.token,
        user: response.data.user,
      });
    } catch (err) {
      addErrorToast(err.response.data.message);
    }
  }

  return { login };
};

export default useLogin;
