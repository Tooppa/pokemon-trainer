import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Pokemon } from "../models/pokemon.model";
import { Trainer } from "../models/trainer.model";

@Injectable({
  providedIn: 'root',
})
export class TrainerState {
  private readonly trainer$ = new BehaviorSubject<Trainer>(new Trainer());

  getTrainer$(): Observable<Trainer> {
    return this.trainer$.asObservable();
  }

  /** Set single trainer to the state */
  setTrainer(trainer: Trainer): void {
    this.trainer$.next(trainer);
  }

  /**
   * Adds pokemon to current trainer
   */
  addPokemon(pokemon: Pokemon[]): void {
    this.setTrainer({
      id: this.trainer$.value.id,
      username: this.trainer$.value.username,
      pokemon: [...this.trainer$.value.pokemon, ...pokemon],
    });
  }

  /**
   * Clears all pokemon from current trainer
   */
  clearPokemon(): void {
    this.setTrainer({
      id: this.trainer$.value.id,
      username: this.trainer$.value.username,
      pokemon: [],
    });
  }
}