import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

import { emailExp, passwordExp } from '../../../utils/validators/const';

import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  LoginForm : FormGroup;
  formSubmitted: boolean = false;
  formError: string = '';
  private _loginSubscribe: Subscription;
  private _formChangeSubscribe: Subscription;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private router: Router ) {

    this.LoginForm = this.fb.group(
      {
        email:  new FormControl('', Validators.compose([
          Validators.pattern(emailExp),
          Validators.required
        ])),
        password:  new FormControl('', Validators.compose([
          Validators.pattern(passwordExp),
          Validators.required
        ])),
      }
    );
  }

  submitForm(form: FormGroup) {
    if(form.valid){
      this.formSubmitted = true;
      this._loginSubscribe = this.auth.login(form.value).subscribe(
        () => {
          this.router.navigate(['/board']);
          this.formSubmitted = false;
          form.reset();
        },
        (err) => {
          this.formSubmitted = false;
          this.formError = err.error.message;
        })
    }
  }

  ngOnInit() {
    this._formChangeSubscribe = this.LoginForm.valueChanges.subscribe(() =>  {
      if(this.LoginForm.valid){
        this.formSubmitted = false
      }
    })
  }

  ngOnDestroy(): void {
    this._loginSubscribe ? this._loginSubscribe.unsubscribe() : null;
    this._formChangeSubscribe ? this._formChangeSubscribe.unsubscribe() : null;
  }

}
