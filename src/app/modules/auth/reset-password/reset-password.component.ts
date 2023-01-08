import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent {

  public form: FormGroup; 
  
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      mail: new FormControl(null, {validators: [Validators.email, Validators.required]})     
    })
  }

  public save(): void {
    
  }  

  public get mail() {
    return this.form.get('mail');
  } 

}
