import { ApiService } from '@/services/api-service';
import { Trip } from '@/models/trip';
import { TripDay } from '@/models/trip-day';

const SERVER_URL = 'http://localhost:3000/api';

export class TripService {
  apiService = new ApiService();

  getTripList(requestBody: any): any {
    return this.apiService.perform('POST', `${SERVER_URL}/trip`, requestBody, null, null);
  }

  getTripDetail(tripId: number): any {
    return this.apiService.perform('GET', `${SERVER_URL}/trip/${tripId}`, null, null, null);
  }

  createTrip(requestBody: Trip): any {
    return this.apiService.perform('POST', `${SERVER_URL}/trip/create`, requestBody, null, null);
  }

  createTripDay(requestBody: TripDay): any {
    return this.apiService.perform('POST', `${SERVER_URL}/trip/day/create`, requestBody, null, null);
  }

  updateTrip(requestBody: Trip): any {
    return this.apiService.perform('PUT', `${SERVER_URL}/trip/update`, requestBody, null, null);
  }

  updateTripDay(requestBody: TripDay): any {
    return this.apiService.perform('PUT', `${SERVER_URL}/trip/day/update`, requestBody, null, null);
  }

  deleteTripDay(tripDayId: number): any {
    return this.apiService.perform('DELETE', `${SERVER_URL}/trip/day/${tripDayId}`, null, null, null);
  }
}
