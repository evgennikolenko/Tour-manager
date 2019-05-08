import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { Place } from "../../../../models/place.model";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherComponent implements OnInit {
  @Input() selectedPlaces: Place[];
  constructor() { }

  ngOnInit() {
  }

  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3};
}
