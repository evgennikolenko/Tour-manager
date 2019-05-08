import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthSocketsService } from '../../socket/auth-sockets.service';
import { Socket } from 'ngx-socket-io';
import * as cron from 'cron';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy, AfterContentChecked {
  user: object;
  private subscriber;
  showBoard: boolean = true;

  constructor( private auth: AuthService,
               private router: Router,
               private socket: Socket,
               private authSockets: AuthSocketsService) {
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(['/login']));
  }

  showCreatePage($event){
    this.showBoard = !$event;
  }

  profilePage(){
    this.router.navigate(['board/profile']);
    this.showBoard = false;
  }

  returnOnBoard(){
    this.router.navigate(['board']);
    this.showBoard = true;
  }

  ngOnInit() {

    new cron.CronJob('0 */30 * * * *', () => {
      this.socket.emit('CONNECT', localStorage.getItem('auth-token'));
    }, null, true, 'Europe/Kiev');


    this.user = this.auth.getUser();
    if(!this.user) {
      this.subscriber = this.auth.getCurrentUser().subscribe(
        (user) => this.user = user,
        (err) => console.log(err)
      )
    }

  }
  ngAfterContentChecked(){
    if(this.router.url === '/board'){
      this.showBoard = true;
    }
  }

  ngOnDestroy(): void {}
}
