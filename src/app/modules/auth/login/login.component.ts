import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public passwordState: string = 'close';
  public incorrectPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private dataService: DataService,
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      mail: new FormControl(null, {validators: [Validators.email, Validators.required], updateOn: 'blur'}),
      password: new FormControl(null, [Validators.required]),
    })
    this.form.valueChanges.subscribe(_ => this.incorrectPassword = false);
  }

  public login(): void {    
    if (this.dataService.getUser(this.form.value)){
      this.router.navigateByUrl(this.router.createUrlTree(['home']));
      this.authService.setUserToken('1111');
    } else {
      this.incorrectPassword = true;
    }    
  }

  public resetPassword(): void {
    this.authService.currentState$.next('reset');
  }

  public signin(): void {    
    this.authService.currentState$.next('signin');
  }  

  public changePasswordState(state: string): void {
    this.passwordState = state;
  }

  public closeIncorrectToast() {
    this.incorrectPassword = false;
  }

  public get mail() {
    return this.form.get('mail');
  }

  public get password() {
    return this.form.get('password');
  }

}
