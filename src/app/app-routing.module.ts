import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {AppComponent} from "./app.component";
import { SelectWorkspaceComponent } from './select-workspace/select-workspace.component';

const routes: Routes = [{
  path: '',
  component: SelectWorkspaceComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
