import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { UserService } from '../services/user-service';

const userService = new UserService();

export class UserController {
  resister(req: express.Request, res: express.Response): void {
    try {
      const newUser: User = req.body;
      
      userService.create(newUser, (result: any, error: any) => {
        if (error) {
          res.status(400).send({error});
        } else {
          res.status(200).send({success: true, result});
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
  
  signIn(req: express.Request, res: express.Response): void {
    try {
      const email = req.body.email;
      userService.retrieve({email}, (user: User, error: any) => {
        if (error) {
          res.status(401).json({message: 'Authentication failed. Email or password is wrong.'});
        } else if (user) {
          if (!userService.checkPassword(req.body.password, user.password)) {
            res.status(401).json({message: 'Authentication failed. Email or password is wrong.'});
          } else {
            res.json({
              success: true,
              token: jwt.sign({
                  email: user.email,
                  username: user.username
                },
                req.app.get('superSecret'),
                {expiresIn: '1d'})
            });
          }
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
  
  update(req: express.Request, res: express.Response): void {
    try {
      const user: User = req.body;
      userService.update(user, (result: any, error: any) => {
        if (error) {
          res.status(400).send({error});
        } else {
          res.status(200).send({success: true, result});
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
  
  logout(req: express.Request, res: express.Response): void {
    // TODO
  }
}
