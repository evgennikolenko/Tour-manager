import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() user : User;
  @Output() profilePage = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<boolean>();
  @Output() returnOnBoard = new EventEmitter<boolean>();

  private isProfile: boolean = false;

  constructor() { }

  onLogout() {
    this.logout.emit();
  }

  onProfilePage(){
    this.profilePage.emit();
    this.isProfile = true;
  }

  onReturnOnBoard() {
    this.returnOnBoard.emit();
    this.isProfile = false;
  }

  ngOnInit() {
  }

}
