import {Directive, ElementRef, Renderer} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Directive({
  selector: '[employee]'
})
export class EmployeeRoleDirective {

  private currentUser;

  constructor(private el: ElementRef,
              private renderer: Renderer,
              private auth: AuthService) {

    this.currentUser = this.auth.currentUser;

    if (this.currentUser && this.currentUser.role === 'employee') {
      renderer.setElementStyle(el.nativeElement, 'display', 'block');
    } else {
      renderer.setElementStyle(el.nativeElement, 'display', 'none');
    }
  }

}
