import {Component, OnInit, Output, EventEmitter, OnDestroy, SimpleChanges, DoCheck, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material';
import { Tour } from '../../models/tour.model';

import { TourService } from '../../services/tour.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tour-board',
  templateUrl: './tour-board.component.html',
  styleUrls: ['./tour-board.component.scss']
})
export class TourBoardComponent implements OnInit, OnDestroy, DoCheck {
  @Input() role: string;
  @Output() showCreatePage = new EventEmitter<boolean>();

  private sortBy = new FormControl('');

  // private role: string;

  private length: number;

  private limit: number = this.tour.tourLimit;
  private pageIndex: number = this.tour.pageIndex;
  private sortValue: string = this.tour.selectedSortItem;

  pageSizeOptions: number[] = [5, 10, 25, 50];

  private tours: Tour[];


  constructor( private tour: TourService,
               private router: Router,
               private auth: AuthService) {
  }

  pageEvent (event) {
    this.tour.tourLimit = event.pageSize;
    this.tour.pageIndex = event.pageIndex;

    if(this.role === 'manager') {
      this.tour.getTours('', this.tour.selectedSortItem, this.tour.tourLimit, event.pageIndex).subscribe(
        (item) => this.tours = item
      )
    } else {
      this.tour.getEmployeeTours('', this.tour.selectedSortItem, this.tour.tourLimit, event.pageIndex).subscribe(
        (item) => this.tours = item
      )
    }
};

  sort(query, item){
  this.limit = this.tour.tourLimit;
  this.pageIndex= this.tour.pageIndex;
  this.tour.selectedSortItem = item;

    if(this.role === 'manager') {
      this.tour.getTours(query, this.tour.selectedSortItem, this.limit, this.pageIndex).subscribe(
        (item) => this.tours = item
      )
    } else {
      this.tour.getEmployeeTours(query, this.tour.selectedSortItem, this.limit, this.pageIndex).subscribe(
        (item) => this.tours = item
      )
    }
  }

  createTour() {
      this.showCreatePage.emit(true);
      this.router.navigate(['board/tour/create'])
  }

  updateTour(tour) {
    this.showCreatePage.emit(true);
    this.router.navigate([`board/tour/update/${tour.id}`])
  }

  ngOnInit() {

    if(!this.limit ) {
      this.limit = 10;
      this.tour.tourLimit = 10;
    }
    if(!this.sortValue) {
      this.tour.selectedSortItem = '';
    }

    if(this.role === 'manager') {
      this.tour.getToursCount().subscribe(
        (item) => this.length = item['count']
      );

      this.tour.getTours('', this.tour.selectedSortItem, this.limit, this.pageIndex).subscribe(
        (item) => {
          this.tours = item
        }
      );
    } else {
      this.tour.getEmployeeToursCount().subscribe(
        (item) => {
          this.length = item['count']
        }
      );

      this.tour.getEmployeeTours('', this.tour.selectedSortItem, this.limit, this.pageIndex).subscribe(
        (item) => this.tours = item
      );
    }

  }

ngDoCheck(): void {
  this.role = this.auth.getRole();
}

  ngOnDestroy(): void {
  }

}
