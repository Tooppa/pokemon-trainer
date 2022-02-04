import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonAPIService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches pokemon from the pokemon API
   * @returns Array of Pokemon as observables
   */
  public fetchPokemon(offset = 0, amount: number): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(
      `${environment.pokemonBaseUrl}pokemon?limit=${amount}&offset=${offset}`
    );
  }

  /**
   * Finds a pokemon from the Pokemon API with a given name
   * @returns Pokemon as observable
   */
  public findPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `${environment.pokemonBaseUrl}pokemon/${name}`
    );
  }
}
