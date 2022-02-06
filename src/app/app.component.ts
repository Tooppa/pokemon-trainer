import { Component, OnInit } from '@angular/core';
import { Trainer } from './models/trainer.model';
import { TrainerFacade } from './services/trainer/trainer.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pokemon-trainer';

  constructor(private readonly trainerFacade: TrainerFacade) { }

  ngOnInit(): void {
    this.trainerFacade.loadStoredTrainer();
  }
}
