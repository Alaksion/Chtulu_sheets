import api from '../services/api';

interface ILoginData {
  email: string;
  password: string;
}

interface ILoginResponse {
  user: { id: string; username: string; email: string; avatarUrl: string };
  token: string;
}

const useAuth = () => {
  async function login({
    email,
    password,
  }: ILoginData): Promise<ILoginResponse> {
    const response = await api.post<ILoginResponse>('login', {
      email,
      password,
    });
    console.log(response);
    api.defaults.headers.Authorization = response.data.token;
    return response.data;
  }

  return { login };
};

export default useAuth;
