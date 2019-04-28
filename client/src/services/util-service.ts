import { ApiService } from './api-service';

const SERVER_URL = 'http://localhost:3000/api';

export class UtilService {
  apiService = new ApiService();

  getCurrencyList(): any {
    const requestBody = {};
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('GET', `${SERVER_URL}/util/currency`, requestBody, searchParams, formParams);
  }

  getTimezoneList(): any {
    const requestBody = {};
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('GET', `${SERVER_URL}/util/timezone`, requestBody, searchParams, formParams);
  }

  getCategoryList(): any {
    const requestBody = {};
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('GET', `${SERVER_URL}/util/category`, requestBody, searchParams, formParams);
  }
}
