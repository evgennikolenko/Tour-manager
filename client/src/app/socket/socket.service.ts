import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
// import { Observable } from 'rxjs';
// import * as Rx from 'rxjs/Rx';
import { Socket } from 'ngx-socket-io';
import {Observable} from "rxjs";
import * as Rx from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  constructor(  private socket: Socket ) {}

  connectedSocket(socket) {
    let observable = new Observable(observer => {
      socket.on('CONNECTED', (data) => {
        observer.next(data);
      });
    });

    let observer = {
      next: (data: Object) => {
        return data;
      },
    };

    return Rx.Subject.create(observer, observable);
  }



}
