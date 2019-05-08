import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from '../../services/auth.service';
import { AuthSocketsService } from '../../socket/auth-sockets.service';

import * as validator from '../../utils/validators/const';

import * as lodash from 'lodash';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private user: object;
  private ProfileForm : FormGroup;
  private showSave: boolean = false;
  private showChange: boolean = true;
  private formSubmitted: boolean = false;
  private oldValues: object;
  private error: string = '';
  private _formChange: Subscription;
  private _updatedUser: Subscription;
  private _updatedUserSocket: Subscription;

  constructor( private auth: AuthService,
               private fb: FormBuilder,
               private authSockets: AuthSocketsService,
               private socket: Socket,
               private router: Router,
               private spinner: NgxSpinnerService) { }

  enableChange(){
    this.ProfileForm.enable();
    this.showChange = false;
  }

  submitForm(form: FormGroup) {
    if(form.valid){
      this.formSubmitted = true;
      const userId = this.user['id'];
      this.spinner.show();
      this._updatedUser = this.auth.updateUser(form.value, userId ).subscribe(
        () => {
          this.spinner.hide();
          this.formSubmitted = false;
          this.oldValues = form.value;
          this.ProfileForm.disable();
          this.ProfileForm.controls['oldPassword'].setValue('');
          this.ProfileForm.controls['newPassword'].setValue('');
          this.error = '';

          this.showSave = false;
          this.showChange = !this.showChange;
        },
        (error) => {
          this.formSubmitted = false;
          this.error = error.error.message;
        });
    }
  }

  ngOnInit() {
    this.user = this.auth.currentUser;
    this.ProfileForm = this.fb.group(
      {
        firstname:  new FormControl(this.user['name'].firstname, Validators.pattern(validator.nameExp)),
        lastname:  new FormControl(this.user['name'].lastname, Validators.pattern(validator.nameExp)),
        email:  new FormControl(this.user['email'], Validators.pattern(validator.emailExp)),
        oldPassword:  new FormControl('', Validators.pattern(validator.passwordExp)),
        newPassword:  new FormControl('', Validators.pattern(validator.passwordExp))
      }
    );
    this.oldValues = this.ProfileForm.value;
    this.onChanges();
    this.ProfileForm.disable();
    this._updatedUserSocket = this.authSockets.updatedUserSocket(this.socket).subscribe(
      (user) => {
        this.user = user;
        this.auth.currentUser = user;
      }
    )
  }

  onChanges(): void {
    this._formChange = this.ProfileForm.valueChanges.subscribe(() => {
      lodash.isEqual(this.oldValues, this.ProfileForm.value)
      ? this.showSave = false : this.showSave = true
    });
  }

  ngOnDestroy(): void {
    this._formChange.unsubscribe();
    this._updatedUser ? this._updatedUser.unsubscribe() : null;
    this._updatedUserSocket.unsubscribe();
  }

}
