import { Trip } from '../models/trip';
import { ApiService } from './api-service';
import { TripDay } from '../models/trip-day';

const SERVER_URL = 'http://localhost:3000/api';

export class TripService {
  apiService = new ApiService();

  getTripList(requestBody: any): any {
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('POST', `${SERVER_URL}/trip`, requestBody, searchParams, formParams);
  }

  createTrip(requestBody: Trip): any {
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('POST', `${SERVER_URL}/trip/create`, requestBody, searchParams, formParams);
  }

  getTripDetailWithDays(tripId: number): any {
    const requestBody = {};
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('GET', `${SERVER_URL}/trip/${tripId}`, requestBody, searchParams, formParams);
  }

  getTripDayWithEvents(tripId: number, tripDayId: number): any {
    const requestBody = {};
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform(
      'GET',
      `${SERVER_URL}/trip/${tripId}/day/${tripDayId}`,
      requestBody,
      searchParams,
      formParams
    );
  }

  createTripDay(requestBody: TripDay): any {
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform(
      'POST',
      `${SERVER_URL}/trip/${requestBody.trip_id}/day/create`,
      requestBody,
      searchParams,
      formParams
    );
  }
}
