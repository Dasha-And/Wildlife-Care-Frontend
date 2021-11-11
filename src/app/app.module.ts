import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import {RouterModule, Routes} from "@angular/router";
import { SpeciesBackOfficeComponent } from './species-back-office/species-back-office.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AnimalsBackOfficeComponent } from './animals-back-office/animals-back-office.component';

const appRoutes: Routes = [
  { path: '', component: MapComponent },
  { path: 'species', component: SpeciesBackOfficeComponent},
  { path: 'animals', component: AnimalsBackOfficeComponent}

]

@NgModule({

  declarations: [
    AppComponent,
    MapComponent,
    SpeciesBackOfficeComponent,
    AnimalsBackOfficeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


