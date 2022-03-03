import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CvListComponent } from './cv-list/cv-list.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import {HttpClientModule} from "@angular/common/http";
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    CvListComponent,
    DetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
