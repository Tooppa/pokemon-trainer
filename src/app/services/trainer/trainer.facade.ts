import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerState } from 'src/app/state/trainer.state';
import { SessionStorageService } from '../session/session-storage.service';
import { TrainerAPIService } from './trainer-api.service';

@Injectable({
  providedIn: 'root',
})
export class TrainerFacade {
  
  constructor(
    private readonly trainerApi: TrainerAPIService,
    private readonly trainerState: TrainerState,
    private readonly sessionStorage: SessionStorageService
  ) {}

  /**
   * Must be called first before any other function is called
   * NOTE: Overrides current sessionStorage
   */
  // TODO: I think we can move this to when request things for the first time?
  public fetchTrainers(): void {
    if (this.sessionStorage.hasSessionSet) {
      const storedTrainers = this.sessionStorage.loadSession<Trainer>();
      this.trainerState.setTrainers$(storedTrainers);
    } else {
      this.trainerApi.getAllTrainers().subscribe((trainers: Trainer[]) => {
        this.trainerState.setTrainers$(trainers);
        this.sessionStorage.saveSession(trainers);
      });
    }
  }

  public postTrainer$(username: string): void {
    this.trainerApi.postTrainer(username).subscribe((trainer: Trainer) => {
      this.trainerState.setTrainer$(trainer);
    });
  }

  public addNewPokemon$(username: string, newPokemon: string[]) {
    this.trainerApi
      .addNewPokemon(username, newPokemon)
      .subscribe((trainer: Trainer) => {
        this.trainerState.setTrainer$(trainer);
      });
  }

  public trainers$(): Observable<Trainer[]> {
    return this.trainerState.getTrainers$();
  }

  public trainer$(username: string): Trainer | undefined {
    return this.trainerState.getTrainer$(username);
  }
}
