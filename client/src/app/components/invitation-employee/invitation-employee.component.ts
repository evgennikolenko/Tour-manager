import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

import { Tour } from '../../models/tour.model';
import { EmployeeService } from '../../services/employee.service';
import { NotificationModalService } from '../../services/notificationModal.service';
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-invitation-employee',
  templateUrl: './invitation-employee.component.html',
  styleUrls: ['./invitation-employee.component.scss']
})

export class InvitationEmployeeComponent implements OnInit {
  @Input() role: string;
  @Output() showCreatePage = new EventEmitter<boolean>();

  constructor( private employee: EmployeeService,
               private router: Router,
               private socket: Socket,
               private notify: NotificationModalService) {
  }

  private showInvList: boolean = false;
  private invitations: Tour[] = [];

  onShowInvitation() {
    return this.showInvList = !this.showInvList;
  }

  selectInvitation(id) {
    this.showCreatePage.emit(true);
    this.router.navigate([`board/tour/invitation/${id}`])
  }

  ngOnInit() {

    this.employee.getInvitations().subscribe((inv) => this.invitations = inv);

    this.employee.invitationWasAdded(this.socket).subscribe((tour) => {
      this.notify.openSnackBar('You have new invitation','', tour.id);

      this.employee.getInvitations().subscribe((inv) => this.invitations = inv);
    })
  }

}
