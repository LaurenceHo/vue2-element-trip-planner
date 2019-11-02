import { ApiService } from '@/services/api-service';

const SERVER_URL = 'http://localhost:3000/api';

export class UserService {
  apiService = new ApiService();

  login(requestBody: any) {
    return this.apiService.perform('POST', `${SERVER_URL}/user/login`, requestBody, null, null);
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(requestBody: any) {
    return this.apiService.perform('POST', `${SERVER_URL}/user/register`, requestBody, null, null);
  }
}
