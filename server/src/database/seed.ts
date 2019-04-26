import * as bcrypt from 'bcrypt';
import { knex } from './knex';

const createCategory = () => {
  const categories = [
    {
      name: 'activity',
    },
    {
      name: 'transportation',
    },
    {
      name: 'info',
    },
    {
      name: 'accommodation',
    },
    {
      name: 'flight',
    },
    {
      name: 'cruise',
    },
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
    email: 'laurence@test.co.nz',
  };

  knex('user')
    .insert(user)
    .then((returning: any) => console.log(returning))
    .catch((err: any) => console.error(err));
};

const createTrip = () => {
  const trips = [
    {
      user_id: 1,
      name: 'Go to New Zealand',
      start_date: '2019-05-01',
      end_date: '2019-05-15',
      destination: 'New Zealand',
      archived: false,
    },
    {
      user_id: 1,
      name: `Let's go to Taiwan`,
      start_date: '2019-07-01',
      end_date: '2019-07-15',
      destination: 'Taiwan',
      archived: false,
    },
  ];

  knex('trip')
    .insert(trips)
    .then((returning: any) => console.log(returning))
    .catch((err: any) => console.error(err));
};

const createTripDay = () => {
  const tripDays = [
    {
      user_id: 1,
      trip_id: 1,
      trip_date: '2019-05-01',
      name: 'Trip day 1',
    },
    {
      user_id: 1,
      trip_id: 1,
      trip_date: '2019-05-02',
      name: 'Trip day 2',
    },
    {
      user_id: 1,
      trip_id: 1,
      trip_date: '2019-05-03',
      name: 'Trip day 3',
    },
  ];

  knex('trip_day')
    .insert(tripDays)
    .then((returning: any) => console.log(returning))
    .catch((err: any) => console.error(err));
};

const createEvent = () => {
  const events = [
    {
      user_id: 1,
      trip_day_id: 1,
      category_id: 4,
      title: 'Hostel in Auckland',
      note: 'Cannot refund',
      cost: 100,
      currency: 'NZD',
    },
    {
      user_id: 1,
      trip_day_id: 1,
      category_id: 2,
      start_time: '07:00',
      end_time: '07:30',
      title: 'Take the bus from Auckland CBD',
    },
    {
      user_id: 1,
      trip_day_id: 1,
      category_id: 1,
      start_time: '09:00',
      end_time: '10:00',
      title: 'sightseeing',
    },
    {
      user_id: 1,
      trip_day_id: 1,
      category_id: 1,
      start_time: '12:00',
      end_time: '13:00',
      title: 'Lunch @ Mt.Eden',
      cost: 50,
      currency: 'NZD',
    },
    {
      user_id: 1,
      trip_day_id: 2,
      category_id: 1,
      start_time: '06:00',
      end_time: '07:00',
      title: 'Breakfast',
      cost: 20,
      currency: 'NZD',
    },
  ];

  knex('event')
    .insert(events)
    .then((returning: any) => console.log(returning))
    .catch((err: any) => console.error(err));
};

createCategory();
createUser();
createTrip();
setTimeout(createTripDay, 3000);
setTimeout(createEvent, 6000);
