import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonFacade } from '../services/pokemon/pokemon.facade';
import { TrainerFacade } from '../services/trainer/trainer.facade';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.scss']
})
export class TrainerPageComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private readonly pokemonService: PokemonFacade,
    private readonly trainerService: TrainerFacade) { }

  get pokemon$(): Observable<Pokemon[]> {
    return this.pokemonService.pokemon$();
  } 
  get trainer$(): any {
    return 
  }

  ngOnInit(): void {
    this.pokemonService.getPokemon(0, 20);
  }

}
