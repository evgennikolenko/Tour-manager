import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

import { NotificationModalService } from '../../services/notificationModal.service';
import { TourBoardComponent } from '../tour-board/tour-board.component'

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {

  constructor( private notify: NotificationModalService ) { }

  openSnackBar() {
    this.notify.openSnackBar('aaaa', 'bbb');
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}

