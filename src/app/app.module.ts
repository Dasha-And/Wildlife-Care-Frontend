import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import {RouterModule, Routes} from "@angular/router";
import { SpeciesBackOfficeComponent } from './species-back-office/species-back-office.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AnimalsBackOfficeComponent } from './animals-back-office/animals-back-office.component';
import { SelectWorkspaceComponent } from './select-workspace/select-workspace.component';
import { LoginComponent } from './login/login.component';
import { WorkersBackOfficeComponent } from './worker-back-office/worker-back-office.component';
import { SuperadminBackOfficeComponent } from './superadmin-back-office/superadmin-back-office.component';
import { VaccineBackOfficeComponent } from './vaccine-back-office/vaccine-back-office.component';
import { VeterinarianBackOfficeComponent } from './veterinarian-back-office/veterinarian-back-office.component';

const appRoutes: Routes = [
  { path: '', component: SelectWorkspaceComponent },
  { path: 'species', component: SpeciesBackOfficeComponent},
  { path: 'login/:nationalParkId', component: LoginComponent},

]

@NgModule({

  declarations: [
    AppComponent,
    MapComponent,
    SpeciesBackOfficeComponent,
    AnimalsBackOfficeComponent,
    SelectWorkspaceComponent,
    LoginComponent,
    WorkersBackOfficeComponent,
    SuperadminBackOfficeComponent,
    VaccineBackOfficeComponent,
    VeterinarianBackOfficeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


