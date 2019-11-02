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
  public activeBtn = "temperature";
  public selectedUnit = "C";

  public options = [
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

  constructor(private genericService?: GenericServiceService) {}

  ngOnInit() {}

  ngOnChanges() {
    console.log("wd cityname: " + this.cityName.name);
    this.genericService
      .getServiceResponse(
        env.mocking
          ? env.appWeatherURLs.getForecastUrl2
          : env.appWeatherURLs.getForecastUrl,
        this.cityName.name
      )
      .subscribe(data => {
        console.log("weather data: ", data);
        this.weatherData = data;
        this.transformedWeatherData = this.transformWeatherData(
          this.weatherData.list
        );
        console.log("transformedData: ", this.transformedWeatherData);
        this.avgWeather = this.getAverageDetails(this.transformedWeatherData);
        console.log("avgWeatherdata: ", this.avgWeather);
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
      weatherDescription: item.weather[0].description,
      weatherIcon: item.weather[0].icon,
      weatherMain: item.weather[0].main,
      wind: {
        degree: item.wind.deg,
        speed: item.wind.speed
      },
      date: new Date(item.dt_txt)
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

  // getWeatherDescription = item => {
  //   return item && item.weatherMain;
  // };

  getWeatherDescription = () => {
    let desc = "";
    let hrs = new Date().getHours();
    if (this.transformedWeatherData && this.transformedWeatherData.length > 0) {
      if (hrs >= 9 && hrs < 12) {
        desc = this.transformedWeatherData[0].weatherMain;
      } else if (hrs >= 12 && hrs < 15) {
        desc = this.transformedWeatherData[1].weatherMain;
      } else if (hrs >= 15 && hrs < 18) {
        desc = this.transformedWeatherData[2].weatherMain;
      } else if (hrs >= 18 && hrs < 21) {
        desc = this.transformedWeatherData[3].weatherMain;
      } else if (hrs >= 21) {
        desc = this.transformedWeatherData[4].weatherMain;
      } else if (hrs >= 0 && hrs < 3) {
        desc = this.transformedWeatherData[5].weatherMain;
      } else if (hrs >= 3 && hrs < 6) {
        desc = this.transformedWeatherData[6].weatherMain;
      } else if (hrs >= 6 && hrs < 9) {
        desc = this.transformedWeatherData[7].weatherMain;
      }
    }

    return desc;
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

  // getTemperature = temperature => {
  //   if (!temperature) return 0;
  //   if (this.selectedUnit === "K") return parseInt(temperature, 10);
  //   else {
  //     const kTemp = parseInt(temperature, 10);
  //     return kTemp - 273;
  //   }
  // };

  getTemperature = () => {
    let temperature;
    let hrs = new Date().getHours();
    if (this.transformedWeatherData && this.transformedWeatherData.length > 0) {
      if (hrs >= 9 && hrs < 12) {
        temperature = this.transformedWeatherData[0].temperature;
      } else if (hrs >= 12 && hrs < 15) {
        temperature = this.transformedWeatherData[1].temperature;
      } else if (hrs >= 15 && hrs < 18) {
        temperature = this.transformedWeatherData[2].temperature;
      } else if (hrs >= 18 && hrs < 21) {
        temperature = this.transformedWeatherData[3].temperature;
      } else if (hrs >= 21) {
        temperature = this.transformedWeatherData[4].temperature;
      } else if (hrs >= 0 && hrs < 3) {
        temperature = this.transformedWeatherData[5].temperature;
      } else if (hrs >= 3 && hrs < 6) {
        temperature = this.transformedWeatherData[6].temperature;
      } else if (hrs >= 6 && hrs < 9) {
        temperature = this.transformedWeatherData[7].temperature;
      }
    }

    if (!temperature) return 0;
    if (this.selectedUnit === "K") return parseInt(temperature, 10);
    else {
      const kTemp = parseInt(temperature, 10);
      return kTemp - 273;
    }
  };

  setSelectedUnit(unit) {
    this.selectedUnit = unit;
  }

  // getIconImageUrl = item => {
  //   if (!item) return "";
  //   return `http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`;
  // };

  getIconImageUrl = () => {
    let weatherIcon;
    let hrs = new Date().getHours();
    if (this.transformedWeatherData && this.transformedWeatherData.length > 0) {
      if (hrs >= 9 && hrs < 12) {
        weatherIcon = this.transformedWeatherData[0].weatherIcon;
      } else if (hrs >= 12 && hrs < 15) {
        weatherIcon = this.transformedWeatherData[1].weatherIcon;
      } else if (hrs >= 15 && hrs < 18) {
        weatherIcon = this.transformedWeatherData[2].weatherIcon;
      } else if (hrs >= 18 && hrs < 21) {
        weatherIcon = this.transformedWeatherData[3].weatherIcon;
      } else if (hrs >= 21) {
        weatherIcon = this.transformedWeatherData[4].weatherIcon;
      } else if (hrs >= 0 && hrs < 3) {
        weatherIcon = this.transformedWeatherData[5].weatherIcon;
      } else if (hrs >= 3 && hrs < 6) {
        weatherIcon = this.transformedWeatherData[6].weatherIcon;
      } else if (hrs >= 6 && hrs < 9) {
        weatherIcon = this.transformedWeatherData[7].weatherIcon;
      }
    }
    if (!weatherIcon) return "";
    return `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  };

  handleChangeSelectedOption = value => {
    this.activeBtn = value;
    console.log("btnval: ", this.activeBtn);
  };
}
