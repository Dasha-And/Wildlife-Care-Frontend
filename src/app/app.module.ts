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
import { SelectWorkspaceComponent } from './select-workspace/select-workspace.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: SelectWorkspaceComponent },
  { path: 'species', component: SpeciesBackOfficeComponent},
  { path: 'animals', component: AnimalsBackOfficeComponent},
  { path: 'login', component: LoginComponent},

]

@NgModule({

  declarations: [
    AppComponent,
    MapComponent,
    SpeciesBackOfficeComponent,
    AnimalsBackOfficeComponent,
    SelectWorkspaceComponent,
    LoginComponent
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


