import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const API = new InjectionToken<string>("API");

@NgModule({
   imports: [
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      ComponentsModule,
      RouterModule,
      AppRoutingModule
   ],
   declarations: [
      AppComponent,
      AdminLayoutComponent      
   ],
   providers: [
      {provide: API, useValue: 'http://map42.gear.host/api'}
   ],
   bootstrap: [
      AppComponent
   ] 
})
export class AppModule { }
