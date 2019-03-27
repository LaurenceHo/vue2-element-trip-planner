import * as bcrypt from 'bcrypt';
import { User } from '../models/user';
import { UserRepository } from '../repositories/user-repository';
import { BaseService } from './base-service';

const userRepository = new UserRepository();

export class UserService implements BaseService<User> {
  retrieve(where: object, callback: any): void {
    userRepository.retrieve(null, where, callback);
  }
  
  create(item: User, callback: any): void {
    item.password = bcrypt.hashSync(item.password, 10);
    
    userRepository.create(item, callback);
  }
  
  update(item: User, callback: any): void {
    item.password = bcrypt.hashSync(item.password, 10);
    
    userRepository.update(item, callback);
  }
  
  delete(id: number, callback: any): void {
    // Do nothing
  }
  
  checkPassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }
}
