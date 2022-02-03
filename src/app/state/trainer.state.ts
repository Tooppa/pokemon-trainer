import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Trainer } from "../models/trainer.model";

@Injectable({
  providedIn: 'root',
})
export class TrainerState {
  private readonly trainers$ = new BehaviorSubject<Trainer[]>([]);

  getTrainers$(): Observable<Trainer[]> {
    return this.trainers$.asObservable();
  }

  getTrainer$(username: string): Trainer | undefined {
    return this.trainers$.value.find((x) => x.username === username);
  }

  setTrainers$(trainers: Trainer[]): void {
    this.trainers$.next(trainers);
  }
    
  setTrainer$(trainer: Trainer): void {
    this.trainers$.next([...this.trainers$.value, trainer]);
  }
}