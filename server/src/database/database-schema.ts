import DatabaseService from './database-service';

const database = new DatabaseService();

export const schema = () => {
  const sql_create_user = 'CREATE TABLE IF NOT EXISTS user (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'username VARCHAR(255) NOT NULL,' +
    'password VARCHAR(255) NOT NULL)';
  
  const sql_create_category = 'CREATE TABLE IF NOT EXISTS category (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'name VARCHAR(255) NOT NULL)';
  
  const sql_create_trip = 'CREATE TABLE IF NOT EXISTS trip (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'user_id INT NOT NULL,' +
    'start_date DATE NOT NULL,' +
    'end_date DATE NOT NULL,' +
    'name VARCHAR(255) NOT NULL,' +
    'destination VARCHAR(255) NOT NULL,' +
    'archived BOOLEAN NOT NULL,' +
    'CONSTRAINT FK_USER_TRIP FOREIGN KEY (user_id) REFERENCES user (id))';
  
  const sql_create_event = 'CREATE TABLE IF NOT EXISTS event (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'trip_id INT NOT NULL,' +
    'category_id INT NOT NULL,' +
    'title VARCHAR(255) NOT NULL,' +
    'start_time DATETIME,' +
    'end_time DATETIME,' +
    'start_location VARCHAR(255),' +
    'end_location VARCHAR(255),' +
    'note VARCHAR(255),' +
    'cost INT,' +
    'currency VARCHAR(16),' +
    'CONSTRAINT FK_CATEGORY_EVENT FOREIGN KEY (category_id) REFERENCES category (id),' +
    'CONSTRAINT FK_TRIP_EVENT FOREIGN KEY (trip_id) REFERENCES trip (id))';
  
  database.query(sql_create_user, null).catch(err => console.error(err));
  database.query(sql_create_trip, null).catch(err => console.error(err));
  database.query(sql_create_category, null).catch(err => console.error(err));
  database.query(sql_create_event, null).catch(err => console.error(err));
};
