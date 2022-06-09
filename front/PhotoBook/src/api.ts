import { User } from './redux/slices/authentication.slice';

export interface LoginForm {
  login: string;
  password: string;
}

class Api {
  async connect(loginForm: LoginForm): Promise<User> {
    const response = await fetch('http://localhost:3000/api/connect', {
      method: 'POST',
      body: JSON.stringify(loginForm),
      headers: {'Content-Type': 'application/json'},
    });
    const status = response.status;

    if (status !== 200) {
        throw new Error('planté');
    }

    const user: User = await response.json();

    return user;
  }
}

const api = new Api();

export default api;
