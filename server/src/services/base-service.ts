export interface BaseService<T> {
  retrieve: (where: object, callback: (result: T[], error: any) => void) => void;
  create: (item: T, callback: (result: any, error: any) => void) => void;
  update: (item: T, callback: (result: T, error: any) => void) => void;
  delete: (id: number, callback: (result: any, error: any) => void) => void;
}
