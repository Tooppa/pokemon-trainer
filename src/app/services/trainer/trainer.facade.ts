import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerState } from 'src/app/state/trainer.state';
import { SessionStorageService } from '../session/session-storage.service';
import { LocalStorageService } from '../storage/local-storage.service';
import { TrainerAPIService } from './trainer-api.service';

@Injectable({
  providedIn: 'root',
})
export class TrainerFacade implements OnInit {
  constructor(
    private readonly trainerApi: TrainerAPIService,
    private readonly trainerState: TrainerState,
    private readonly sessionStorage: SessionStorageService,
    private readonly localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    // TODO: Investigate if we should do this here
    // Does this get ran even tho we're not using it?
    this.fetchTrainers();
  }

  /**
   * Must be called first before any other function is called
   * NOTE: Overrides current sessionStorage
   */
  private fetchTrainers(): void {
    this.trainerApi.getAllTrainers().subscribe((trainers: Trainer[]) => {
      this.trainerState.setTrainers(trainers);
      this.sessionStorage.saveSession(trainers);
    });
  }

  /**
   * Posts trainer to trainer database. Also saves it to localStorage
   */
  public postTrainer(username: string, callback: any): void {
    this.trainerApi.postTrainer(username).subscribe((trainer: Trainer) => {
      this.trainerState.setTrainer(trainer);
      this.localStorage.save({ username: trainer.username, pokemon: trainer.pokemon});
      callback();
    });
  }

  /**
   * Adds new pokemon to user
   */
  public addNewPokemon(username: string, newPokemon: string[]) {
    this.trainerApi
      .addNewPokemon(username, newPokemon)
      .subscribe((trainer: Trainer) => {
        this.trainerState.setTrainer(trainer);
      });
  }

  /**
   * Gets current trainers from the trainer state
   */
  public trainers$(): Observable<Trainer[]> {
    return this.trainerState.getTrainers$();
  }

  /**
   * Gets trainer with usename from the trainer state
   */
  public trainer$(username: string): Trainer | undefined {
    return this.trainerState.getTrainer(username);
  }
}
