import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

import { nameExp, emailExp, passwordExp } from '../../../utils/validators/const';
import { dateValidator } from '../../../utils/validators/registrationValidator';

import { Subscription } from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit, OnDestroy {
  private RegistrationForm : FormGroup;
  private error;
  private formSubmitted: boolean = false;
  private jobs;
  private _jobSubscription: Subscription;
  private _formChangeSubscribe: Subscription;

  constructor( private fb: FormBuilder,
               private router: Router,
               private auth: AuthService) {
    this.createForm();
  }

  createForm() {
    this.RegistrationForm = this.fb.group(
      {
        firstName: new FormControl('',
          Validators.compose([
            Validators.required,
            Validators.pattern(nameExp)
          ])),
        lastName:  new FormControl('',
          Validators.compose([
            Validators.required,
            Validators.pattern(nameExp),
        ])),
        date:  new FormControl('', Validators.required, dateValidator),
        gender:  new FormControl('', Validators.required),
        role:  new FormControl('', Validators.required),
        job:  new FormControl(''),
        email:  new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(emailExp)
        ])),
        password:  new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(passwordExp)
        ])),
      }
    );
  }

  submitForm(form: FormGroup) {
    if(form.valid){

      const user = {
        firstname: form.value.firstName,
        lastname: form.value.lastName,
        birth: form.value.date,
        role: form.value.role,
        gender: form.value.gender,
        email: form.value.email,
        password: form.value.password,
        roleInCompanyId: form.value.job
      };

      this.formSubmitted = true;
      this.auth.registration(user).subscribe(
        () => {
        this.formSubmitted = false;
        form.reset();
        this.router.navigate(['/board'])},
        error => {
          this.error = error.error;
        }
      )}
  }

  ngOnInit() {
    this._jobSubscription = this.auth.getJobs().subscribe((jobs) => this.jobs = jobs);
    this._formChangeSubscribe = this.RegistrationForm.valueChanges.subscribe(() =>  {
      if(this.RegistrationForm.valid){
        this.formSubmitted = false
      }
    })
  }

  ngOnDestroy(): void {
    this._jobSubscription ? this._jobSubscription.unsubscribe() : null;
    this._formChangeSubscribe ? this._formChangeSubscribe.unsubscribe() : null;
  }

}
