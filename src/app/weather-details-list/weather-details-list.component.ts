import { Component, OnInit, Input } from "@angular/core";
import { WeatherDetailsComponent } from "../weather-details/weather-details.component";
import * as moment from "moment";

@Component({
  selector: "app-weather-details-list",
  templateUrl: "./weather-details-list.component.html",
  styleUrls: ["./weather-details-list.component.scss"]
})
export class WeatherDetailsListComponent implements OnInit {
  @Input() transformedWeatherData;
  @Input() activeButton;
  @Input() selectedUnit;
  @Input() avgWeatherData;
  @Input() data;

  public date;
  public time;
  public day;
  public humidityURL = "../assets/humidity.png";
  public windURL = "../assets/wind.svg";
  public speed;
  public averageSpeed;
  public windAngle;
  constructor() {}

  ngOnInit() {
    this.date = moment(this.data.date);
    this.time = this.date.format("h A");
    this.day = this.date.format("ddd");
    this.averageSpeed = this.avgWeatherData && this.avgWeatherData.windSpeed;
    this.speed = this.getWind(this.data) / this.averageSpeed;
    this.windAngle = this.getWindDegree(this.data);
  }

  getTemperature = temperature => {
    if (!temperature) return 0;
    if (this.selectedUnit === "K") return parseInt(temperature, 10);
    else {
      const kTemp = parseInt(temperature, 10);
      return kTemp - 273;
    }
  };

  getIconImageUrl = item => {
    if (!item) return "";
    return `http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`;
  };

  getHumidity = item => {
    return item && item.humidity;
  };

  getWind = item => {
    return item && item.wind && item.wind.speed;
  };

  getWindDegree = item => {
    return item && item.wind && item.wind.degree;
  };
}
