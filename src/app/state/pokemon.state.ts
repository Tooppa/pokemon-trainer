import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonState {
  private readonly pokemon$ = new BehaviorSubject<Pokemon[]>([]);
  private selectedPokemon: Pokemon | undefined = undefined;

  /** Get pokemon objservable */
  getPokemon(): Observable<Pokemon[]> {
    return this.pokemon$.asObservable();
  }

  /** Set pokemon to the state */
  setPokemon(pokemon: Pokemon[]): void {
    this.pokemon$.next(pokemon);
  }

  setCurrentlySelectedPokemon(pokemon: Pokemon | undefined) {
    this.selectedPokemon = pokemon;
  }

  get currentlySelectedPokemon(): Pokemon | undefined {
    return this.selectedPokemon;
  }
}
