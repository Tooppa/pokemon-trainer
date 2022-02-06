import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PokemonDetails } from '../models/pokemon-details.model';
import { Pokemon } from '../models/pokemon.model';
import { PokemonFacade } from '../services/pokemon/pokemon.facade';
import { TrainerFacade } from '../services/trainer/trainer.facade';
import { PokemonState } from '../state/pokemon.state';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.scss'],
})
export class TrainerPageComponent implements OnInit {

  constructor(
    private readonly pokemonService: PokemonFacade,
    private readonly trainerService: TrainerFacade
  ) {}

  get pokemon$(): Observable<Pokemon[]> {
    return this.pokemonService.pokemon$();
  }

  get currentPokemon(): Pokemon | undefined {
    return this.pokemonService.currentPokemon;
  }

  get trainer$(): any {
    return;
  }

  ngOnInit(): void {
    this.pokemonService.getPokemon(0, 20);
  }
}
