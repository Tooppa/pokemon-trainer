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
    this.trainerApi.postTrainer(username).subscribe((trainer: Trainer) => {
      this.trainerState.setTrainer(trainer);
      this.localStorage.save(trainer);
      callback();
    });
  }

  /**
   * Adds new pokemon to user
   */
  public addNewPokemon(newPokemon: Pokemon): void {
    const savedTrainer = this.localStorage.load<Trainer>();

    // If new pokemon already exists in the trainers collection, do not add it
    if (savedTrainer?.pokemon.find(p => p.id === newPokemon.id)) {
      return;
    }

    this.trainerApi
      .addNewPokemon(savedTrainer!.id, [...savedTrainer!.pokemon,newPokemon])
      .subscribe((trainer: Trainer) => {
        this.localStorage.save({
          id: savedTrainer!.id,
          username: savedTrainer?.username,
          pokemon: [...savedTrainer!.pokemon, newPokemon],
        });
        this.trainerState.addPokemon([newPokemon]);
        this.trainerState.setTrainer(trainer);
      });
  }

  /**
   * Gets current trainer
   */
  get currentTrainer(): Observable<Trainer> {
    return this.trainerState.getTrainer$();
  }
}
