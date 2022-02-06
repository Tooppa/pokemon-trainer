import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss'],
})
export class PokemonViewComponent {
  @Input() pokemon: Pokemon = new Pokemon('', 0, '', '');

  @Output() onPokemonClick: EventEmitter<Pokemon> = new EventEmitter();

  pokemonCLick(): void {
    this.onPokemonClick.emit(this.pokemon);
  }
}
