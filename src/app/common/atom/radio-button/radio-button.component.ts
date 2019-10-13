import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-radio-button",
  templateUrl: "./radio-button.component.html",
  styleUrls: ["./radio-button.component.scss"]
})
export class RadioButtonComponent implements OnInit {
  @Input() option;
  @Input() selectedValue;
  @Output() buttonValue = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onClickSelect(evt) {
    this.buttonValue.emit(this.option.value);
  }
}
