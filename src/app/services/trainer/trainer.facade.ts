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

  public postTrainer$(username: string): void {
    this.trainerApi.postTrainer(username).subscribe((trainer: Trainer) => {
      this.trainerState.setTrainer(trainer);
      this.localStorage.save(trainer);
    });
  }

  public addNewPokemon$(username: string, newPokemon: string[]) {
    this.trainerApi
      .addNewPokemon(username, newPokemon)
      .subscribe((trainer: Trainer) => {
        this.trainerState.setTrainer(trainer);
      });
  }

  get localTrainer(): Trainer | null {
    return this.localStorage.load<Trainer>();
  }

  public trainers$(): Observable<Trainer[]> {
    return this.trainerState.getTrainers$();
  }

  public trainer$(username: string): Trainer | undefined {
    return this.trainerState.getTrainer(username);
  }
}
