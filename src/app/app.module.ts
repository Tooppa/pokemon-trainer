import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainerAPIService } from './services/trainer/trainer-api.service';
import { SessionStorageService } from './services/session/session-storage.service';
import { PokemonAPIService } from './services/pokemon/pokemon-api.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';
import { CataloguePageComponent } from './catalogue-page/catalogue-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TrainerPageComponent,
    CataloguePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PokemonAPIService, TrainerAPIService, SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
