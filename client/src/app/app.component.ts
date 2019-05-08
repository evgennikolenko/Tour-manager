import {ViewEncapsulation, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthSocketsService } from './socket/auth-sockets.service';
import { Socket } from 'ngx-socket-io';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit{

  constructor( private auth: AuthService,
               private router: Router,
               private socket: Socket,
               private authSockets: AuthSocketsService,
               private spinner: NgxSpinnerService) {

    const token = localStorage.getItem('auth-token');

    if(token){
      this.spinner.show();
      auth.setToken(token);
      router.navigate(['/board']);

      this.socket.connect();
      this.socket.emit('CONNECT', token);

    } else {
      router.navigate(['/login'])
    }
  }

ngOnInit(): void {
  if(this.auth.isAuth()) this.spinner.show();

  this.authSockets.connectedSocket(this.socket).subscribe(
    (connect) => {
      this.spinner.hide();
      if(connect.error){
        this.auth.logout().subscribe(() => {
          this.spinner.hide();
          this.router.navigate(['/login'])
        });
      }
    }
  )
}

}
