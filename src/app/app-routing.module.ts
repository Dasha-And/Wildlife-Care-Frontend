import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {AppComponent} from "./app.component";
import { SelectWorkspaceComponent } from './select-workspace/select-workspace.component';
import { LoginComponent } from './login/login.component';
import {AnimalsBackOfficeComponent} from "./animals-back-office/animals-back-office.component";
import {WorkersBackOfficeComponent} from "./worker-back-office/worker-back-office.component";
import {SuperadminBackOfficeComponent} from "./superadmin-back-office/superadmin-back-office.component";
import {SpeciesBackOfficeComponent} from "./species-back-office/species-back-office.component";
import {VaccineBackOfficeComponent} from "./vaccine-back-office/vaccine-back-office.component";
import {VeterinarianBackOfficeComponent} from "./veterinarian-back-office/veterinarian-back-office.component";

const routes: Routes = [{
  path: '',
  component: SelectWorkspaceComponent,
},
{ path: 'login/:nationalParkId', component: LoginComponent},
  { path: ':id/animals', component: AnimalsBackOfficeComponent},
  { path: ':id/workers', component: WorkersBackOfficeComponent},
  {path: 'map/:id', component: MapComponent},
  {path: 'nationalParks', component: SuperadminBackOfficeComponent},
  { path: 'species', component: SpeciesBackOfficeComponent},
  { path: 'vaccines', component: VaccineBackOfficeComponent},
  {path: ':id/veterinarian', component: VeterinarianBackOfficeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
