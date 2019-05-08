import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from '../../services/auth.service';

import { Subscription } from "rxjs";

import * as nsfwjs from 'nsfwjs'

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent implements OnInit, OnDestroy {
  @Input() user;
  @ViewChild('avatar') avatar: ElementRef;

  private AvatarForm : FormGroup;

  constructor( private auth: AuthService,
               private fb: FormBuilder,
               private spinner: NgxSpinnerService) { }

  private selectedFile: File;
  private _updateAvatar: Subscription;
  private error;
  defaultAvatar = '../../../assets/image/defaultAvatar.png';

  detectBlurStatus = (prediction) => {
    let errorMessage = '';
    prediction.map((item) => {
      switch (item.className) {
        case 'Hentai':
          if( +(prediction.probability * 100).toFixed(2) >= 50 ) {
            errorMessage = 'It is Hentai';
          }
        case 'Porn':
          if( +(item.probability * 100).toFixed(2) >= 50 ) {
            errorMessage = 'It is Porn';
          }
        case 'Sexy':
          if( +(prediction.probability * 100).toFixed(2) >= 50 ) {
            errorMessage = 'It is Porn';
          }
      }
    });
    if(errorMessage){
      return errorMessage
    } else {
      return false
    }
  };

   async upload(event) {
    this.selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    let preview = document.querySelectorAll('img')[1];
    console.log('preview', preview);
    // @ts-ignore
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
      // @ts-ignore
      preview.src = reader.result;
      preview.style.filter = 'blur(0.5rem)';
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }

     const model = await nsfwjs.load();

     const predictions = await model.classify(preview);
    console.log(predictions);
    if(!this.detectBlurStatus(predictions)){
      preview.style.filter = 'blur(0rem)';
      this.spinner.show();
      this._updateAvatar = this.auth.updateAvatar(formData).subscribe(() => this.spinner.hide())
      this.error = '';
    } else {
      this.error = this.detectBlurStatus(predictions);
    }
  }

  async ngOnInit() {
    this.AvatarForm = this.fb.group(
      {
        file:  new FormControl('', Validators.required),
      }
    );
  }

  ngOnDestroy(): void {
    this._updateAvatar ? this._updateAvatar.unsubscribe() : null;
  }
}
