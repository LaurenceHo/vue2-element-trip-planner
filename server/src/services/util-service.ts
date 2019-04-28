import { UtilRepository } from '../repositories/util-repository';

const utilRepository = new UtilRepository();

export class UtilService {
  retrieveTimezone(callback: any): void {
    utilRepository.retrieveTimezone(callback);
  }

  retrieveCategories(callback: any): void {
    utilRepository.retrieveCategories(callback);
  }

  retrieveCurrencies(callback: any): void {
    utilRepository.retrieveCurrencies(callback);
  }
}
