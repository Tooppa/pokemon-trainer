import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Ability,
  PokemonDetails,
  Stat,
  Type,
} from 'src/app/models/pokemon-details.model';
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
    // private readonly pokemonDetailsState: PokemonDetailState,
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

  // TODO: Figure out if we can remove the need to have this method
  public getMorePokemons(offset: number, amount: number): void {
    this.pokemonApi
      .fetchPokemon(offset, amount)
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
        this.pokemonState.setPokemon([...pokemon]);
      });
  }

  /**
   * Sets currently selected pokemon to state and fetches it's details if necessary
   */
  private getPokemonDetails(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    const sessionPokemon: Pokemon[] =
      this.sessionStorage.loadSession<Pokemon>();
    const found: Pokemon | undefined = sessionPokemon.find((x) => x.id === id);

    const foundPokemon: Pokemon = new Pokemon('', 0, '', '');
    // Assigning found pokemon to new object. .find creates new object which does not have functions
    Object.assign(foundPokemon, found);

    const hasDetails = foundPokemon?.details;

    if (hasDetails) {
      this.pokemonState.setCurrentlySelectedPokemon(foundPokemon);
    } else {
      this.pokemonApi
        .fetchPokmeonDetails(id)
        .pipe(
          map((res: any) => {
            const stats: Stat[] = [];
            for (const stat of res.stats) {
              stats.push({
                base_stat: stat.base_stat,
                name: stat.stat.name,
              });
            }

            const abilities: Ability[] = [];
            for (const a of res.abilities) {
              abilities.push({
                name: a.ability.name,
                url: a.ability.url,
              });
            }

            const types: Type[] = [];
            for (const t of res.types) {
              types.push({
                name: t.type.name,
                url: t.type.url,
              });
            }

            return new PokemonDetails(
              res.height,
              res.weight,
              stats,
              abilities,
              types
            );
          })
        )
        .subscribe((details: PokemonDetails) => {
          foundPokemon?.setDetails(details);
          this.appendDataToExisting(id, details);
          this.pokemonState.setPokemon(sessionPokemon);
          this.pokemonState.setCurrentlySelectedPokemon(foundPokemon);
        });
    }
  }

  /**
   * Used for listing the pokemon
   */
  public pokemon$(): Observable<Pokemon[]> {
    return this.pokemonState.getPokemon();
  }

  /**
   * Get the currently selected pokemon
   */
  public get currentPokemon(): Pokemon | undefined {
    return this.pokemonState.currentlySelectedPokemon;
  }

  /**
   * Sets current pokemon
   */
  public setCurrentPokemon(pokemon: Pokemon | undefined): void {
    this.getPokemonDetails(pokemon?.id);
  }

  /**
   * Append data to existing pokemon list in the session
   */
  private appendDataToExisting(id: number, details: PokemonDetails): void {
    const pokemon: Pokemon[] = this.sessionStorage.loadSession<Pokemon>();

    const foundPokemon = pokemon.find((x) => x.id === id);
    if (foundPokemon) {
      foundPokemon.details = details;
      this.sessionStorage.saveSession([...pokemon]);
    } else {
      console.error('could not find pokemon with id', id);
    }
  }
}
