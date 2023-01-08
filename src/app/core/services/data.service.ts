import {Injectable} from '@angular/core';

export interface IUser {
  user: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {  

  public _users: IUser[]= [];
  
  public addUser (user: IUser) {
    this._users.push(user);
  }

  public getUser(user: IUser): boolean {
    const dataBaseUser = this._users.find(dataUser => dataUser.user === user.user);
    if (!dataBaseUser) {
      return false
    } else {
      return dataBaseUser.password === user.password
    }
  }

}
