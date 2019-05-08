import {Component, Input, OnInit} from '@angular/core';
import {Place} from "../../../../models/place.model";
import {TourService} from "../../../../services/tour.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-weather-in-city',
  templateUrl: './weather-in-city.component.html',
  styleUrls: ['./weather-in-city.component.scss']
})
export class WeatherInCityComponent implements OnInit {
  @Input() place: Place;
  constructor( private tour: TourService) {
  }
  private weather;
  private temperature: number;
  private code: number;
  private sunrise;
  private sunset;
  private wind;

  private forecasts;
  private forecastDay;
  private forecastDate;
  private forecastHight;
  private forecastLow;
  private forecastCode;

  ngOnInit() {

   this.tour.getWeather(this.place).subscribe(
      (item) => {
        console.log(item)
        this.weather = item;
        let condIcon;

        this.code = this.weather.current_observation.condition.code;
        this.temperature = this.weather.current_observation.condition.temperature;
        this.sunrise = this.weather.current_observation.astronomy.sunrise;
        this.sunset = this.weather.current_observation.astronomy.sunset;
        this.wind = this.weather.current_observation.wind.speed;

        this.forecasts = this.weather.forecasts;

        switch (this.code) {
          case 0:
            condIcon = 'tornado';
            break;

          case 1:
            condIcon = 'tornado';
            break;

          case 2:
            condIcon = 'hurricane';
            break;

          case 3:
          case 4:
            condIcon = 'day-thunderstorm';
            break;

          case 5:
          case 6:
          case 7:
            condIcon = 'rain-mix';
            break;

          case 8:
          case 9:
            condIcon = 'showers';
            break;

          case 10:
          case 11:
          case 12:
            condIcon = 'rain';
            break;

          case 13:
          case 14:
          case 15:
          case 16:
            condIcon = 'snow';
            break;

          case 17:
          case 18:
            condIcon = 'hail';
            break;

          case 19:
            condIcon = 'dust';
            break;

          case 20:
          case 21:
            condIcon = 'fog';
            break;

          case 22:
            condIcon = 'smoke';
            break;

          case 23:
          case 24:
            condIcon = 'windy';
            break;

          case 25:
            condIcon = 'snowflake-cold';
            break;

          case 26:
            condIcon = 'cloudy';
            break;

          case 27:
          case 29:
            condIcon = 'night-cloudy';
            break;

          case 28:
          case 30:
            condIcon = 'day-cloudy';
            break;

          case 31:
            condIcon = 'night-clear';
            break;

          case 32:
            condIcon = 'day-sunny';
            break;

          case 33:
            condIcon = 'stars';
            break;

          case 34:
            condIcon = 'sunny';
            break;

          case 35:
            condIcon = 'rain-mix';
            break;

          case 36:
            condIcon = 'hot';
            break;

          case 37:
          case 38:
          case 39:
            condIcon = 'thunderstorm';
            break;

          case 40:
            condIcon = 'sprinkles';
            break;

          case 41:
          case 42:
            condIcon = 'snow';
            break;

          case 44:
            condIcon = 'day-cloudy';
            break;

          case 45:
            condIcon = 'thundershower';
            break;

          case 46:
            condIcon = 'snow';
            break;

          case 47:
            condIcon = 'storm-showers';
            break;

          case 3200:
            condIcon = 'thermometer-exterior';
            break;

          default:
            condIcon = 'thermometer-exterior';
        }

        condIcon = 'wi-' + condIcon;
        $('i').addClass('wi').addClass(condIcon);

      }
    );

  }

  returtDate(date){
    return new Date(date)
  }

}
