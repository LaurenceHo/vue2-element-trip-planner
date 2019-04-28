import { knex } from '../database/knex';

export class UtilRepository {
  retrieveTimezone(callback: any): void {
    knex('timezone')
      .then((results: any) => callback(results))
      .catch((err: any) => callback(null, err));
  }

  retrieveCategories(callback: any): void {
    knex('category')
      .then((results: any) => callback(results))
      .catch((err: any) => callback(null, err));
  }

  retrieveCurrencies(callback: any): void {
    knex('currency')
      .then((results: any) => callback(results))
      .catch((err: any) => callback(null, err));
  }
}
