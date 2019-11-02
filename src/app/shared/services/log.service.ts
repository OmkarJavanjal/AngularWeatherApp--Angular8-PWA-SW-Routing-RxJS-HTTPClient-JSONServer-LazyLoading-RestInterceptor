import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { env } from "src/environments/environment-loader";
import { GenericServiceService } from "./generic-service.service";

@Injectable({
  providedIn: "root"
})
export class LogService {
  messages: string[] = [];
  public obj;
  constructor(
    private httpClient: HttpClient,
    private genericService: GenericServiceService
  ) {}

  addMessage(message: string) {
    this.messages.push(message);
    console.log("Logged Messages: ", this.messages);
    //   this.obj = {
    //     message
    //   }
    //   console.log('called');
    //   //this.addMsgToDB(this.obj, true);
    //  // this.httpClient.post(env.cityList.logs, this.obj).subscribe(res => {console.log('resp: ', res)})
  }

  getMessages() {
    return this.messages;
  }

  logStatusToDB() {
    // this.httpClient.post(env.cityList.logs, this.messages).subscribe(res => {
    //   console.log("resp: ", res);
    // });
    // this.genericService
    //   .getServiceResponse(env.cityList.logs, this.messages)
    //   .subscribe(res => {
    //     console.log("resp: ", res);
    //   });
  }

  clear() {
    this.messages = [];
  }
}
