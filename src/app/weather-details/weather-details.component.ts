import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { GenericServiceService } from "../shared/services/generic-service.service";
import { env } from "src/environments/environment-loader";

@Component({
  selector: "app-weather-details",
  templateUrl: "./weather-details.component.html",
  styleUrls: ["./weather-details.component.scss"]
})
export class WeatherDetailsComponent implements OnInit, OnChanges {
  @Input() cityName;
  public weatherDetails;

  constructor(private genericService: GenericServiceService) {}

  ngOnInit() {}

  ngOnChanges() {
    console.log("wd cityname: " + this.cityName);
    this.genericService
      .getServiceResponse(
        env.mocking
          ? env.appWeatherURLs.getForecastUrl2
          : env.appWeatherURLs.getForecastUrl,
        this.cityName
      )
      .subscribe(data => {
        console.log("weather data: ", data);
        this.weatherDetails = data;
      });
  }
}
