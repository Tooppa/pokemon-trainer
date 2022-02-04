import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonState {
  private readonly pokemon$ = new BehaviorSubject<Pokemon[]>([]);

  /** Get pokemon objservable */
  getPokemon(): Observable<Pokemon[]> {
    return this.pokemon$.asObservable();
  }

  /** Set pokemon to the state */
  setPokemon(pokemon: Pokemon[]): void {
    this.pokemon$.next(pokemon);
  }
}
