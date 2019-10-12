import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-drop-down-list",
  templateUrl: "./drop-down-list.component.html",
  styleUrls: ["./drop-down-list.component.scss"]
})
export class DropDownListComponent implements OnInit {
  public cities = [];
  @Input() cityList: any;
  @Output() cityName = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.cityList.list.forEach(obj => {
      this.cities.push(obj.name);
    });
  }

  onClickSubmit(cityName) {
    this.cityName.emit(cityName);
  }
}
