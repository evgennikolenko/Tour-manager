import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../../../../models/place.model';

@Component({
  selector: 'app-world-clock',
  templateUrl: './world-clock.component.html',
  styleUrls: ['./world-clock.component.scss']
})
export class WorldClockComponent implements OnInit {
  @Input() selectedPlaces: Place[];

  constructor() { }

  ngOnInit() {
  }

  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3};
}
