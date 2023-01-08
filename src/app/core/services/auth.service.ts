import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  public currentState$: BehaviorSubject<string> = new BehaviorSubject('login');


  public getUserToken(): string {
    return localStorage.getItem('token');
  }

  public setUserToken(token: string) {
    localStorage.setItem('token', token);
  }

  public logOut() {
    localStorage.removeItem('token');    
  }

  public checkLogin(user: string, password: string): boolean {
    const userData = localStorage.getItem('user');
    const [localUser, localPassword] = userData.split(',');

    return user === localUser && password === localPassword;
  }

}
