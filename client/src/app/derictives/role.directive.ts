import {Directive, ElementRef, Renderer} from '@angular/core';
// import {AuthService} from '../services/auth.service';
import {AuthService} from '../services/auth.service';

@Directive({
  selector: "[manager]"
})
export class RoleDirective {

  private currentUser;

  constructor(private el: ElementRef,
              private renderer: Renderer,
              private auth: AuthService) {

    this.currentUser = this.auth.currentUser;

    if (this.currentUser && this.currentUser.role === 'manager') {
      renderer.setElementStyle(el.nativeElement, 'display', 'block');
    } else {
      renderer.setElementStyle(el.nativeElement, 'display', 'none');
    }
  }

}
