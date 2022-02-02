import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainerAPIService {

  constructor(private readonly http: HttpClient) {}

  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(environment.baseUrl);
  }

  getTrainer(username: string): Observable<Trainer> {
    return this.http.get<Trainer>(`${environment.baseUrl}?username=${username}`);
  }

  postTrainer(username: string): Observable<Trainer> {
    return this.http.post<Trainer>(
      environment.baseUrl,
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

  // TODO: Does not work as intended yet.
  // updateTrainer(username: string, newPokemon: string[]): Observable<Trainer> {
  //   return this.http.patch<Trainer>(
  //     `${environment.baseUrl}/${username}`,
  //     JSON.stringify({ newPokemon }),
  //     {
  //       headers: {
  //         'X-API-Key': environment.apiKey,
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  // }
}
