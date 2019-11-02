import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public cityName = {
    id: 1270260,
    name: "Pune",
    country: "IN",
    coord: {
      lon: 76,
      lat: 29
    }
  };
  constructor() {}

  ngOnInit() {}

  onCitySelect(cityName) {
    console.log(cityName);
    this.cityName = cityName;
  }
}
