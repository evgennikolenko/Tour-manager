import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { TourService } from '../../../../../services/tour.service';
import { AuthService } from '../../../../../services/auth.service';
import { Place } from '../../../../../models/place.model';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-select-palces',
  templateUrl: './select-palces.component.html',
  styleUrls: ['./select-palces.component.scss']
})
export class SelectPalcesComponent implements OnInit, OnDestroy {

  @ViewChild("map")
  public mapElement: ElementRef;
  @Output() placeWasSelected = new EventEmitter();

  constructor( private tour: TourService,
               private auth: AuthService ) {
  }

  private places: Place[] = [];
  private _placesSubscription: Subscription;
  public selectedPlace: object;

  ngOnInit() {
    this._placesSubscription = this.tour.getPlaces().subscribe((places) => this.places = places)
  }

  ngOnDestroy(): void {
    this._placesSubscription ? this._placesSubscription.unsubscribe() : null;
  }

  selectOnMap(tour){
    this.placeWasSelected.emit(tour);
  }

  public selectPlace($event) {
    this.selectedPlace = { palce: $event, timestub: new Date() };
    this.tour.selectPlace($event);
  }

}
