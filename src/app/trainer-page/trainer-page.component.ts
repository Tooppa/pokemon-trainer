import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../models/pokemon-details.model';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonFacade } from '../services/pokemon/pokemon.facade';
import { TrainerFacade } from '../services/trainer/trainer.facade';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.scss'],
})
export class TrainerPageComponent {
  constructor(
    private readonly pokemonFacade: PokemonFacade,
    private readonly trainerFacade: TrainerFacade
  ) {}

  get currentPokemon(): Pokemon | undefined {
    return this.pokemonFacade.currentPokemon;
  }

  get currentTrainer$(): Observable<Trainer> {
    return this.trainerFacade.currentTrainer;
  }

  pokemonClick(pokemon: Pokemon): void {
    this.pokemonFacade.setCurrentPokemon(pokemon);
  }

  onClearPokemon(): void {
    const canDelete = confirm('You are about to clear your Pokemon colletion. Are you sure?');
    if (canDelete) { 
      this.trainerFacade.clearPokemon();
    }
  }
}
