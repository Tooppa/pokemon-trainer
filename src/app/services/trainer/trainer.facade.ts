import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerState } from 'src/app/state/trainer.state';
import { LocalStorageService } from '../storage/local-storage.service';
import { TrainerAPIService } from './trainer-api.service';

@Injectable({
  providedIn: 'root',
})
export class TrainerFacade {
  constructor(
    private readonly trainerApi: TrainerAPIService,
    private readonly trainerState: TrainerState,
    private readonly localStorage: LocalStorageService
  ) {}

  public loadStoredTrainer(): void {
    const storedTrainer = this.localStorage.load<Trainer>();
    if (storedTrainer) {
      this.trainerState.setTrainer(storedTrainer);
    }
  }

  /**
   * Posts trainer to trainer database. Also saves it to localStorage
   */
  public postTrainer(username: string, callback: any): void {
    // First we check if there is an user with that username already in database
    this.trainerApi
      .getTrainer(username)
      .subscribe((foundTrainers: Trainer[]) => {
        // If we find the user from database, set it as the current user
        if (foundTrainers.length > 0) {
          this.trainerState.setTrainer(foundTrainers[0]);
          this.localStorage.save(foundTrainers[0]);
          callback();
        } else {
          // If not, create a new user
          this.trainerApi
            .postTrainer(username)
            .subscribe((trainer: Trainer) => {
              this.trainerState.setTrainer(trainer);
              this.localStorage.save(trainer);
              callback();
            });
        }
      });
  }

  /**
   * Adds new pokemon to user
   */
  public addNewPokemon(newPokemon: Pokemon): void {
    // If new pokemon already exists in the trainers collection, do not add it
    const savedTrainer = this.localStorage.load<Trainer>();
    if (savedTrainer?.pokemon.find((p) => p.id === newPokemon.id)) {
      return;
    }

    this.trainerApi
      .addNewPokemon(savedTrainer!.id, [...savedTrainer!.pokemon, newPokemon])
      .subscribe((trainer: Trainer) => {
        this.localStorage.save({
          id: trainer.id,
          username: trainer.username,
          pokemon: [...trainer.pokemon, newPokemon],
        });
        this.trainerState.addPokemon([newPokemon]);
      });
  }

  /**
   * Clears all pokemon from user
   */
  public clearPokemon(): void {
    const savedTrainer = this.localStorage.load<Trainer>();
    this.trainerApi
      .addNewPokemon(savedTrainer!.id, [])
      .subscribe((trainer: Trainer) => {
        this.localStorage.save({
          id: trainer.id,
          username: trainer.username,
          pokemon: [],
        });
        this.trainerState.clearPokemon();
      });
  }

  /**
   * Gets current trainer
   */
  get currentTrainer(): Observable<Trainer> {
    return this.trainerState.getTrainer$();
  }
}
