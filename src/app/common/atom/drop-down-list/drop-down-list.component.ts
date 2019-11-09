import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterContentChecked
} from "@angular/core";
import { map } from "rxjs/operators";
import { GenericServiceService } from "src/app/shared/services/generic-service.service";
import { CityListURL } from "./../../../../environments/urlFactory/city-list";

@Component({
  selector: "app-drop-down-list",
  templateUrl: "./drop-down-list.component.html",
  styleUrls: ["./drop-down-list.component.scss"]
})
export class DropDownListComponent implements OnInit, AfterContentChecked {
  public cities = [];
  @Input() cityList: any;
  @Output() cityName = new EventEmitter<string>();

  constructor(private genericService: GenericServiceService) {}

  ngOnInit() {
    this.genericService.isCityListAvl.subscribe(res => {
      this.cityList = res;
      this.cityList.forEach(obj => {
        this.cities.push(obj.name);
      });
    });

    //this.onClickSubmit(this.cityList.list[0].name);
  }

  ngAfterContentChecked(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.cityName.emit(this.cityList.list[0]);
  }

  onClickSubmit(cityName) {
    let cityObj = this.cityList.find(cities => {
      //replaced filter with find
      return cities.name == cityName ? cities : null;
      // if (cities.name == cityName) {
      //   return cities;
      // }
    });
    //console.log("cityObj", cityObj);
    this.cityName.emit(cityObj);
  }
}
