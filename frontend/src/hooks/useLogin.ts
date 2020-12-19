import api from '../services/api';
import { useAuth } from '../context/authContext';

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

  async function login({
    email,
    password,
  }: ILoginData): Promise<ILoginResponse> {
    const response = await api.post<ILoginResponse>('login', {
      email,
      password,
    });
    api.defaults.headers.Authorization = response.data.token;
    setUserData({
      token: response.data.token,
      user: response.data.user,
    });
    return response.data;
  }

  return { login };
};

export default useLogin;
