import { ApiService } from './api-service';

const SERVER_URL = 'http://localhost:3000/api/';

export class UserService {
  apiService = new ApiService();
  
  signin(requestBody: any) {
    const searchParams = {};
    const formParams = {};
    
    return this.apiService.perform('POST', `${SERVER_URL}user/signin`, requestBody, searchParams, formParams);
  }
  
  logout() {
    localStorage.removeItem('token');
  }
}
