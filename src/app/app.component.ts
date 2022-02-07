import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from './models/trainer.model';
import { TrainerFacade } from './services/trainer/trainer.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly trainerFacade: TrainerFacade) { }
  
  get currentTrainer$(): Observable<Trainer> {
    return this.trainerFacade.currentTrainer;
  }

  ngOnInit(): void {
    this.trainerFacade.loadStoredTrainer();
  }
}
