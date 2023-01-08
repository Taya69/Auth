import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {

 public currentState: string;

 constructor(private authService: AuthService) {}

 public ngOnInit(): void {
     this.authService.currentState$.subscribe(state => this.currentState = state);
 }

 public changeState(state: string): void {
  this.authService.currentState$.next(state);
 }
}
