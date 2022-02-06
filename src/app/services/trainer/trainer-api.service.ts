import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from '../../models/trainer.model';

import { environment } from 'src/environments/environment';
import { Pokemon } from 'src/app/models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class TrainerAPIService {
  constructor(private readonly http: HttpClient) {
    if (environment.apiKey === undefined) {
      console.error('api key is mising');
    }
  }

  /**
   * Fetches all trainers in the Trainer API
   */
  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(environment.trainersBaseUrl);
  }

  /**
   * Gets a trainer with given username
   */
  getTrainer(username: string): Observable<Trainer> {
    return this.http.get<Trainer>(
      `${environment.trainersBaseUrl}?username=${username}`
    );
  }

  /**
   * Post user with given username to database. This is useful when creating new trainer.
   */
  postTrainer(username: string): Observable<Trainer> {
    return this.http.post<Trainer>(
      environment.trainersBaseUrl,
      {
        username: username,
        pokemon: [],
      },
      {
        headers: {
          'X-API-Key': environment.apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  /**
   * Adds list of pokemon to user
   * @param newPokemon pokemon to add
   */
  addNewPokemon(username: string, newPokemon: Pokemon[]): Observable<Trainer> {
    return this.http.patch<Trainer>(
      `${environment.trainersBaseUrl}/${username}`,
      JSON.stringify({ newPokemon }),
      {
        headers: {
          'X-API-Key': environment.apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
