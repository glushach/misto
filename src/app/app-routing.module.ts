import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MapComponent} from './map/map.component';
import {ContactComponent} from './contact/contact.component';

// http: //localhost:4200/ -> HomeComponent
// http: //localhost:4200/map -> MapComponent
// http: //localhost:4200/contact -> ContactComponent

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent},
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
