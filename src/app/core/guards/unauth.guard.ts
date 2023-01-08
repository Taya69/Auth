import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
      console.log('guard')
    }
  
    canActivate() {

  
      if (this.authService.getUserToken()) {
        this.router.navigateByUrl(this.router.createUrlTree(['home']));
        return false;
      }      
  
      return true;
    }

}