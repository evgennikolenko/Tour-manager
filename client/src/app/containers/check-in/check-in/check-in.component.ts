import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})

export class CheckInComponent implements OnInit, OnDestroy {
  constructor() {}

  cambiar_login() {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
    document.querySelector('.cont_form_login')['style'].display = "block";
    document.querySelector('.cont_form_sign_up')['style'].opacity = "0";

    setTimeout(function(){  document.querySelector('.cont_form_login')['style'].opacity = "1"; },400);

    setTimeout(function(){
      document.querySelector('.cont_form_sign_up')['style'].display = "none";
    },200);
  }

  cambiar_sign_up(at) {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
    document.querySelector('.cont_form_sign_up')['style'].display = "block";
    document.querySelector('.cont_form_login')['style'].opacity = "0";

    setTimeout(function(){  document.querySelector('.cont_form_sign_up')['style'].opacity = "1";
    },100);

    setTimeout(function(){   document.querySelector('.cont_form_login')['style'].display = "none";
    },400);
  }

  ocultar_login_sign_up() {
    document.querySelector('.cont_forms').className = "cont_forms";
    document.querySelector('.cont_form_sign_up')['style'].opacity = "0";
    document.querySelector('.cont_form_login')['style'].opacity = "0";

    setTimeout(function(){
      document.querySelector('.cont_form_sign_up')['style'].display = "none";
      document.querySelector('.cont_form_login')['style'].display = "none";
    },500);
  }

  ngOnInit() {}

  ngOnDestroy(): void {}

}

