import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainerAPIService } from './services/trainer/trainer-api.service';
import { SessionStorageService } from './services/session/session-storage.service';
import { PokemonAPIService } from './services/pokemon/pokemon-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PokemonAPIService, TrainerAPIService, SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
