import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { GenericServiceService } from "../shared/services/generic-service.service";
import { env } from "src/environments/environment-loader";
import * as moment from "moment";

@Component({
  selector: "app-weather-details",
  templateUrl: "./weather-details.component.html",
  styleUrls: ["./weather-details.component.scss"]
})
export class WeatherDetailsComponent implements OnInit, OnChanges {
  @Input() cityName;
  public weatherData;
  public avgWeather;
  public transformedWeatherData;

  options = [
    {
      label: "Temperature",
      value: "temperature"
    },
    {
      label: "Humidity",
      value: "humidity"
    },
    {
      label: "Wind",
      value: "wind"
    }
  ];

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
        this.weatherData = data;
        this.transformedWeatherData = this.transformWeatherData(
          this.weatherData.list
        );
        console.log("transformedData: ", this.transformedWeatherData);
        this.avgWeather = this.getAverageDetails(this.transformWeatherData);
      });
  }

  transformWeatherData = weatherData => {
    if (!weatherData || !Array.isArray(weatherData)) return [];
    return weatherData.map(item => ({
      temperature: item.main.temp,
      temperature_max: item.main.temp_max,
      temperature_min: item.main.temp_min,
      pressure: item.main.pressure,
      humidity: item.main.humidity,
      weatherDescription: item.weather.description,
      weatherIcon: item.weather[0].icon,
      weatherMain: item.weather[0].main,
      wind: {
        degree: item.wind.deg,
        speed: item.wind.speed
      },
      date: new Date(item.dt * 1000)
    }));
  };

  getAverageDetails = weatherData => {
    if (!weatherData || !Array.isArray(weatherData) || !weatherData.length)
      return {};

    const totalWeatherData = weatherData.reduce((prevValue, currentValue) => {
      const value = {
        temperature: prevValue.temperature || 0,
        pressure: prevValue.pressure || 0,
        humidity: prevValue.humidity || 0,
        windSpeed:
          (prevValue.wind && prevValue.wind.speed) ||
          (prevValue.windSpeed && prevValue.windSpeed) ||
          0
      };
      return {
        temperature: value.temperature + currentValue.temperature,
        pressure: value.pressure + currentValue.pressure,
        humidity: value.humidity + currentValue.humidity,
        windSpeed: value.windSpeed + currentValue.wind.speed
      };
    });

    const listLength = (weatherData && weatherData.length) || 1;
    return {
      temperature: totalWeatherData.temperature / listLength,
      pressure: totalWeatherData.pressure / listLength,
      humidity: totalWeatherData.humidity / listLength,
      windSpeed: totalWeatherData.windSpeed / listLength
    };
  };

  getDay = item => {
    if (!item) return "";
    return moment(item.date).format("dddd");
  };

  getWeatherDescription = item => {
    return item && item.weatherMain;
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

  // getTemperature = (temperature) => {
  //     if (!temperature) return 0;
  //     const { selectedUnit } = this.state;
  //     if (selectedUnit === 'K') return parseInt(temperature, 10);
  //     else {
  //         const kTemp = parseInt(temperature, 10);
  //         return parseInt(kTemp - 273);
  //     }
  // }

  getIconImageUrl = item => {
    if (!item) return "";
    return `http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`;
  };
}
