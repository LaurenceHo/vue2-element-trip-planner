export interface BaseRepository<T> {
  
  retrieve(columns: string[], whereClauses: object, callback: any): void;
  
  create(item: T, callback: any): void;
  
  update(item: T, callback: any): void;
  
  delete(id: number, callback: any): void;
  
}
