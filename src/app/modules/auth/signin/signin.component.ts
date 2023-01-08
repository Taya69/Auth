import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public passwordState: string = 'close';
  public repeatPasswordState: string = 'close';  
  public passwordInValidationState = {
    matching: true,
    pattern: true,
  };
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
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-#!$@%^&*_+~=:;?\/])[-\w#!$@%^&*+~=:;?\/]{8,}$/),
      ]),
      repeatPassword: new FormControl(null, [Validators.required]),
    })

    this.form.valueChanges.subscribe(value => {   
        this.passwordInValidationState.matching = value.password !== value.repeatPassword; 
        this.passwordInValidationState.pattern = this.form.get('password').errors?.['pattern'];  
        this.incorrectPassword = false;    
    })
  }

  public signin(): void {    
      if (this.passwordInValidationState.matching || this.passwordInValidationState.pattern) {
        this.incorrectPassword = true;
      } else {
        if (this.form.valid) {
          this.authService.setUserToken('1111');
          this.dataService.addUser(this.form.value);
          this.router.navigateByUrl(this.router.createUrlTree(['home']));
        }      
      }      
  }

  public resetPassword(): void {
    this.authService.currentState$.next('reset');
  }

  public lognin(): void {    
    this.authService.currentState$.next('login');
  }  

  public changePasswordState(state: string): void {
    this.passwordState = state;
  }

  public changerepeatPasswordState(state: string): void {
    this.repeatPasswordState = state;
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

  public get repeatPassword() {
    return this.form.get('repeatPassword');
  }
}
