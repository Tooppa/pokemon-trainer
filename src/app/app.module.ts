import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';
import { CataloguePageComponent } from './catalogue-page/catalogue-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TrainerPageComponent,
    CataloguePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
