import { ApiService } from './api-service';

const SERVER_URL = 'http://localhost:3000/api';

export class TripService {
  apiService = new ApiService();
  
  getAllTrips = (requestBody: any): any => {
    const searchParams = {};
    const formParams = {};
    
    return this.apiService.perform('POST', `${SERVER_URL}/trip`, requestBody, searchParams, formParams);
  }
}
