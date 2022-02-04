import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Trainer } from "../models/trainer.model";

@Injectable({
  providedIn: 'root',
})
export class TrainerState {
  private readonly trainers$ = new BehaviorSubject<Trainer[]>([]);

  /** Get trainers from the state */
  getTrainer(username: string): Trainer | undefined {
    return this.trainers$.value.find((x) => x.username === username);
  }

  /** Set trainers to the state */
  setTrainers(trainers: Trainer[]): void {
    this.trainers$.next(trainers);
  }

  /** Set single trainer to the state */
  setTrainer(trainer: Trainer): void {
    this.trainers$.next([...this.trainers$.value, trainer]);
  }

  /** Get trainers observable */
  getTrainers$(): Observable<Trainer[]> {
    return this.trainers$.asObservable();
  }
}