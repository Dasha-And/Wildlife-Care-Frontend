import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {AppComponent} from "./app.component";
import { SelectWorkspaceComponent } from './select-workspace/select-workspace.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: '',
  component: SelectWorkspaceComponent,
},
{ path: 'login/:nationalParkId', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
