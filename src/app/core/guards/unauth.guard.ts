import { LocationStrategy } from '@angular/common';
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private locationStrategy: LocationStrategy) {
      console.log(locationStrategy.getBaseHref())
    }
  
    canActivate() {

  
      if (this.authService.getUserToken()) {
        this.router.navigateByUrl(this.router.createUrlTree([this.locationStrategy.getBaseHref(),'home']));
        return false;
      }      
  
      return true;
    }

}