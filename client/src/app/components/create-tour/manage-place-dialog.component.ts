import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { TourService } from '../../services/tour.service';
import { AuthService } from '../../services/auth.service';
import { Place } from '../../models/place.model';

@Component({
  selector: 'place-manage-dialog',
  templateUrl: './manage-place-dialog.html',
  styleUrls: ['./manage-place-dialog.scss']
})
export class PlaceManageDialog implements OnInit{

  private places: Place[] = [];
  private role: string;

  constructor( public dialogRef: MatDialogRef<PlaceManageDialog>,
               private tour: TourService,
               private auth: AuthService ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
      this.tour.getPlaces().subscribe((places) => this.places = places)
      this.role = this.auth.currentUser['role'];
  }

  stringifyEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  isActive(place) {
    const founded = this.tour.selectedPlaces.find(item => this.stringifyEqual(item, place));
    return !!founded;
  };
}
