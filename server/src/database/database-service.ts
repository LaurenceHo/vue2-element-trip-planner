import * as mysql from 'mysql';

export default class DatabaseService {
  pool: any = {};
  
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 12,
      host: 'localhost',
      user: 'sa',
      password: '(IJN8uhb',
      database: 'tripplanner',
      charset: 'utf8'
    });
  }
  
  getConnection = (callback: any) => {
    this.pool.getConnection(callback);
  }
  
  query = (sql: string, options: any) => new Promise((resolve, reject) => {
    this.getConnection((err: any, connection: any) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, options, (err: any, results: any) => {
          console.debug('SQL: ', sql);
          console.debug('Query options: ', options);
          connection.release();
          
          if (err) {
            reject(err);
          } else {
            console.debug('Query results:', JSON.stringify(results));
            resolve(results);
          }
        });
      }
    });
  })
  
  destroy = () => {
    this.pool.end((err: any) => console.error(err));
  }
}
