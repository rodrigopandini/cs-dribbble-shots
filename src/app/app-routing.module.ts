import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShotListComponent } from './shots/shot-list/shot-list.component';
import { ShotComponent } from './shots/shot/shot.component';

const ROUTES: Routes = [
  { path: '', component: ShotListComponent },
  { path: 'shots/:id', component: ShotComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
