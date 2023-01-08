import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent {

  constructor (private authService: AuthService, private router: Router) {}

  public logout() {
    this.router.navigateByUrl(this.router.createUrlTree(['auth']));
    this.authService.currentState$.next('login');
    this.authService.logOut();
  }

}
