import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonState } from 'src/app/state/pokemon.state';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from '../session/session-storage.service';
import { PokemonAPIService } from './pokemon-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonFacade {
  constructor(
    private readonly pokemonApi: PokemonAPIService,
    private readonly pokemonState: PokemonState,
    private readonly sessionStorage: SessionStorageService
  ) {}

  /**
   *  Used for data fetching. Sets the current state to represent the amount of data requested.
   * Access data with pokemon$ observable
   */
  public getPokemon(offset: number, amount: number): void {
    // Check if there are enough pokemon cached
    const sessionPokemon: Pokemon[] =
      this.sessionStorage.loadSession<Pokemon>();
    if (sessionPokemon.length >= amount) {
      this.pokemonState.setPokemon(sessionPokemon.splice(0, amount));
    } else {
      // If not, fetch the remaining pokemon starting from the last index of saved pokemon
      const missingCount = amount - sessionPokemon.length;
      this.pokemonApi
        .fetchPokemon(sessionPokemon.length, missingCount)
        .pipe(
          map((res: any) => {
            const createdPokemon: Pokemon[] = [];
            for (const i of res.results) {
              const id = Number(
                i.url.match(i.url.match(/\/pokemon\/(\d+)\//)[1])
              );
              createdPokemon.push(
                new Pokemon(
                  i.name,
                  id,
                  i.url,
                  `${environment.pokemonImgBaseUrl}${id}.png`
                )
              );
            }
            return createdPokemon;
          })
        )
        .subscribe((pokemon: Pokemon[]) => {
          // Append newly requested pokemon to session storage
          this.sessionStorage.appendSession(pokemon);

          // Set requested amount of pokemon to state
          this.pokemonState.setPokemon([...sessionPokemon, ...pokemon]);
        });
    }
  }

  /**
   * Used for listing the pokemon
   */
  public pokemon$(): Observable<Pokemon[]> {
    return this.pokemonState.getPokemon();
  }
}
