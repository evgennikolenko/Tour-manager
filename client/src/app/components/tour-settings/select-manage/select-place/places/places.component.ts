import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Place } from '../../../../../models/place.model';
import { TourService } from '../../../../../services/tour.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  @Input() places: Place[];
  @Output() onSelectPlace = new EventEmitter<boolean>();
  constructor( private tour: TourService ) { }

  ngOnInit() {
  }

  stringifyEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  selectActivePlace(place) {
    const founded = this.tour.selectedPlaces.find(item => this.stringifyEqual(item, place));
    return !!founded;
  }

  selectPlace($event) {
    this.onSelectPlace.emit($event);
  }

}
