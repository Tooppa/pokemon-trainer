import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonFacade } from '../services/pokemon/pokemon.facade';
import { PokemonState } from '../state/pokemon.state';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss'],
})
export class PokemonViewComponent implements OnInit {
  @Input() pokemon: Pokemon | undefined;
  constructor(private readonly pokemonFacade: PokemonFacade) {}

  ngOnInit(): void {}

  pokemonCLick(): void {
    this.pokemonFacade.setCurrentPokemon(this.pokemon);
  }
}
