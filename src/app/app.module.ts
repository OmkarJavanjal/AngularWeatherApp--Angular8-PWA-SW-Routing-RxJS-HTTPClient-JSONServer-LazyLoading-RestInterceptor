import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { httpInterceptorProviders } from "./shared/Interceptors";
import { SelectCityComponent } from "./select-city/select-city.component";
import { PageNotFoundComponent } from "./common/organism/page-not-found/page-not-found.component";
import { DropDownListComponent } from "./common/atom/drop-down-list/drop-down-list.component";
import { HomeComponent } from "./home/home.component";
import { WeatherDetailsComponent } from "./weather-details/weather-details.component";
import { RadioButtonComponent } from "./common/atom/radio-button/radio-button.component";
import { WeatherDetailsListComponent } from "./weather-details-list/weather-details-list.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SelectCityComponent,
    PageNotFoundComponent,
    DropDownListComponent,
    HomeComponent,
    WeatherDetailsComponent,
    WeatherDetailsListComponent,
    RadioButtonComponent,
    WeatherDetailsListComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
