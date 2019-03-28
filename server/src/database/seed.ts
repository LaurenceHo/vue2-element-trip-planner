import * as bcrypt from 'bcrypt';
import { knex } from './knex';

const createCategory = () => {
  const categories = [
    {
      name: 'activity'
    },
    {
      name: 'transportation'
    },
    {
      name: 'info'
    },
    {
      name: 'accommodation'
    }
  ];
  
  knex('category')
    .insert(categories)
    .then((returning: any) => console.log(returning))
    .catch((err: any) => console.error(err));
};

const createUser = () => {
  const user = {
    username: 'laurence.ho',
    password: bcrypt.hashSync('abc123', 10),
    email: 'laurence.ho@test.co.nz'
  };
  
  knex('user')
    .insert(user)
    .then((returning: any) => console.log('user id: ' + returning[ 0 ]))
    .catch((err: any) => console.error(err));
};

const createTrip = () => {
  const trip = {
    user_id: 1,
    start_date: '2019-05-01',
    end_date: '2019-05-15',
    destination: 'New Zealand',
    archived: false
  };
  
  knex('trip')
    .insert(trip)
    .then((returning: any) => console.log('trip id: ' + returning[ 0 ]))
    .catch((err: any) => console.error(err));
};

createCategory();
createUser();
createTrip();
