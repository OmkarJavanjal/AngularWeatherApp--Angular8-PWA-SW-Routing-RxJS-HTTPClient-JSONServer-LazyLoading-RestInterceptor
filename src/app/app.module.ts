import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './shared/Interceptors';
import { SelectCityComponent } from './select-city/select-city.component';
import { PageNotFoundComponent } from './common/organism/page-not-found/page-not-found.component';
import { DropDownListComponent } from './common/atom/drop-down-list/drop-down-list.component';
import { HomeComponent } from './home/home.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { RadioButtonComponent } from './common/atom/radio-button/radio-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectCityComponent,
    PageNotFoundComponent,
    DropDownListComponent,
    HomeComponent,
    WeatherDetailsComponent,
    WeatherListComponent,
    RadioButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
