export interface BaseRepository<T> {
  
  retrieve(columns: string[], where: string, callback: any): void;
  
  create(item: T, callback: any): void;
  
  update(item: T, callback: any): void;
  
  delete(id: number, callback: any): void;
  
}
