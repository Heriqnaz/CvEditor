import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CvListComponent } from './cv-list/cv-list.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import {HttpClientModule} from "@angular/common/http";
import {MaterialExampleModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SkillSectionComponent } from './details-page/skill-section/skill-section.component';
import { JobSectionComponent } from './details-page/job-section/job-section.component';
import { PersonalInfoSectionComponent } from './details-page/personal-info-section/personal-info-section.component';

@NgModule({
  declarations: [
    AppComponent,
    CvListComponent,
    DetailsPageComponent,
    SkillSectionComponent,
    JobSectionComponent,
    PersonalInfoSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
