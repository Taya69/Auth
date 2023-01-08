import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) {
    }
  
    canActivate() {

  
      if (this.authService.getUserToken()) {
        console.log('true')
        return true;
      }
      
      
  
      return false;
    }

}