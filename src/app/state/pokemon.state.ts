import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonState {
  private readonly pokemon$ = new BehaviorSubject<Pokemon[]>([]);

  getPokemon(): Observable<Pokemon[]> {
    return this.pokemon$.asObservable();
  }

  setPokemon(pokemon: Pokemon[]): void {
    this.pokemon$.next(pokemon);
  }
}
