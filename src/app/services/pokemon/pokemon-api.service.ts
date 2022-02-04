import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonAPIService {

  constructor(private readonly http: HttpClient) { }

  public fetchPokemon(offset = 0, amount: number): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(
      `${environment.pokemonBaseUrl}pokemon?limit=${amount}&offset=${offset}`
    );
  }

  public findPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.pokemonBaseUrl}pokemon/${name}`);
  }
}
