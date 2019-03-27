import { Trip } from '../models/trip';
import { TripRepository } from '../repositories/trip-repository';

const tripRepository = new TripRepository();

export class AuthenticationService {
  checkTripOwner(req: any, res: any, next: any): void {
    if (req.user) {
      try {
        if (req.params.trip_id) {
          tripRepository.retrieve(null, {id: req.params.trip_id}, (result: Trip[], error: any) => {
            if (error) {
              res.status(400).send({error});
            } else {
              if (result[ 0 ].user_id !== req.user.id) {
                res.status(403).send({message: 'You have no permission'});
              } else {
                next();
              }
            }
          });
        }
      } catch (error) {
        console.error(error);
        res.status(400).send({error});
      }
    } else {
      res.status(401).send({message: 'Please login first'});
    }
  }
}
