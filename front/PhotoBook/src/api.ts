import { backEndUrl } from './env';
import { authFetch } from './fetch';
import { Article } from './redux/slices/articles.slice';
import {User} from './redux/slices/authentication.slice';

export interface LoginForm {
  login: string;
  password: string;
}

class Api {

  apiUrl = backEndUrl + '/api';

  async connect(loginForm: LoginForm): Promise<User> {
    const response = await fetch(this.apiUrl + '/connect', {
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

  async disconnect() {
    await fetch(this.apiUrl + '/disconnect', {
      method: 'POST',
    });
  }

  async isConnected(): Promise<User | undefined> {
    const response = await fetch(this.apiUrl + '/is-connected', {
      method: 'GET',
    });
    const status = response.status;
    const user = await response.json();
    console.log('status:', status);

    if (status !== 200) {
      return undefined;
    }

    return user;
  }

  async addArticle(article: Article) {
    const url = this.apiUrl + '/articles';
    console.log('url: ', url);

    const response = await authFetch(url, {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 201) {
      throw new Error('pété');
    }

    return await response.json();
  }

  async getArticles(): Promise<Article[]> {
    const response = await authFetch(this.apiUrl + '/articles');

    if (response.status !== 200) {
      throw new Error('pété');
    }

    return await response.json();
  }

  async upload(formData: FormData) {
    return await authFetch(this.apiUrl + '/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  }
}

const api = new Api();

export default api;
