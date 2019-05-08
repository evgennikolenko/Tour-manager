import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations'

import { TourService } from '../../../services/tour.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-tour-window',
  templateUrl: './tour-window.component.html',
  styleUrls: ['./tour-window.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':leave', [
        animate('1000ms ease-out', style({transform: 'skewY(-35deg) translateX(-60%) scale(0) '}))
      ])
    ])
  ]
})
export class TourWindowComponent implements OnInit {

  constructor( private router: Router,
               private tour: TourService,
               private employee: EmployeeService) { }
 show = true;
  ngOnInit() {
  }

  private exitOnBoard() {
    this.show = false;
    this.tour.cleanPlaces();
    this.employee.cleanStaff();
    setTimeout(() => {
     this.router.navigate(['board']);
    }, 1100)

  }

}
