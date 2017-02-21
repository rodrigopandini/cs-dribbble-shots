import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Material Design
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShotListComponent } from './shots/shot-list/shot-list.component';
import { ShotComponent } from './shots/shot/shot.component';
import { ShotService } from './shots/shared/shot.service';

import { RouterLinkStubDirective, RouterOutletStubComponent } from './testing/router-stubs';

@NgModule({
  declarations: [
    AppComponent,
    ShotListComponent,
    ShotComponent,
    RouterLinkStubDirective,
    RouterOutletStubComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ShotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
