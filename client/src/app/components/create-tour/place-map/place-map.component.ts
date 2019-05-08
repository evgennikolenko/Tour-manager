import {Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit} from '@angular/core';
import { TourService } from '../../../services/tour.service';

declare var H: any;

@Component({
  selector: 'app-place-map',
  templateUrl: './place-map.component.html',
  styleUrls: ['./place-map.component.scss']
})
export class PlaceMapComponent implements OnInit, AfterViewInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  public appId: any;

  @Input()
  public appCode: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  private platform: any;
  private map: any;

  private ui: any;
  private search: any;

  public constructor( private tour: TourService ) { }

  public ngOnInit() {

    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
    this.search = new H.places.Search(this.platform.getPlacesService());

    this.tour.selectedPlaces.forEach((item) => {
      this.search.request({ "q": item.city, "at": this.lat + "," + this.lng }, {}, data => {
        for(let i = 0; i < data.results.items.length; i++) {
          let marker = new H.map.Marker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] });
          marker.setData("<p>" + data.results.items[i].title + "<br>" + data.results.items[i].vicinity + "</p>");
          marker.addEventListener('tap', event => {
            let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
              content: event.target.getData()
            });
            this.ui.addBubble(bubble);

          }, false);
          this.map.addObject(marker)
        }
      }, error => {
        console.error(error);
      });
    })
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 2,
        center: { lat: this.lat, lng: this.lng }
      }
    );
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

  }


  public places(query) {
    this.tour.selectPlace(query);
    this.search.request({ "q": query.city, "at": this.lat + "," + this.lng }, {}, data => {
      for(let i = 0; i < data.results.items.length; i++) {
        this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i]);
      }
    }, error => {
      console.error(error);
    });
  }

  stringifyEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
  }


  private dropMarker(coordinates: any, data: any) {
    let marker = new H.map.Marker(coordinates);
    let deleted = false;
    marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");
    marker.addEventListener('tap', event => {
      let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);

    if(this.map.getObjects().length === 0) {
      this.map.addObject(marker);
    } else {
      this.map.getObjects().map((item, index) => {
        if(this.stringifyEqual(marker.b, item.b) ){
          this.map.removeObject(item);
          deleted = true;
        } else if(index === this.map.getObjects().length - 1){
          deleted = false;
        }
      });
      if(!deleted){
        this.map.addObject(marker)
      }
    }
  }
}
