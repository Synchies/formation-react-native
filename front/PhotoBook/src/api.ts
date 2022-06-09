import {sleep} from './utils';

export interface LoginForm {
  login: string;
  password: string;
}

class Api {
  async connect(loginForm: LoginForm) {
    await sleep(2000);
    throw new Error();
  }
}

const api = new Api();

export default api;
