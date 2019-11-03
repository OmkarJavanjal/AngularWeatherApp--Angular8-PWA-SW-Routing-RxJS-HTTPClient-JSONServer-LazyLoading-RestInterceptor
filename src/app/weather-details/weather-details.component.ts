import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { GenericServiceService } from "../shared/services/generic-service.service";
import { env } from "src/environments/environment-loader";
import * as moment from "moment";
import { LogService } from "../shared/services/log.service";

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

  constructor(
    private genericService?: GenericServiceService,
    private logService?: LogService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.avgWeather = null;
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

    // console.log("view in");
    // let obj = {
    //   message: this.logService.getMessages
    // };
    // this.genericService
    //   .getServiceResponse(env.cityList.logs, obj)
    //   .subscribe(res => {
    //     console.log("resp: ", res);
    //   });
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
    let hrs = new Date().getHours();
    let curWeatherMain = this.transformedWeatherData.filter(
      (item, index, arr) => {
        let hr1 = new Date(item.date).getHours();
        let hr2 = new Date(
          this.transformedWeatherData[index != 39 ? index + 1 : index].date
        ).getHours();
        if (hrs >= hr1 && hrs < hr2) {
          return item;
        }
      }
    );
    let desc = curWeatherMain[0].weatherMain;
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
    let hrs = new Date().getHours();
    let curTemp = this.transformedWeatherData.filter((item, index, arr) => {
      let hr1 = new Date(item.date).getHours();
      let hr2 = new Date(
        this.transformedWeatherData[index != 39 ? index + 1 : index].date
      ).getHours();
      if (hrs >= hr1 && hrs < hr2) {
        return item;
      }
    });
    let temperature = curTemp[0].temperature;
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
    let hrs = new Date().getHours();
    let curWeatherIcon = this.transformedWeatherData.filter(
      (item, index, arr) => {
        let hr1 = new Date(item.date).getHours();
        let hr2 = new Date(
          this.transformedWeatherData[index != 39 ? index + 1 : index].date
        ).getHours();
        if (hrs >= hr1 && hrs < hr2) {
          return item;
        }
      }
    );
    let weatherIcon = curWeatherIcon[0].weatherIcon;
    if (!weatherIcon) return "";
    return `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  };

  handleChangeSelectedOption = value => {
    this.activeBtn = value;
    console.log("btnval: ", this.activeBtn);
  };
}
