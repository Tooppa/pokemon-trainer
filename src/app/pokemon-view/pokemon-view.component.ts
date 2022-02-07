import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss'],
})
export class PokemonViewComponent {
  @Input() pokemon: Pokemon = new Pokemon('', 0, '', '');

  @Output() onPokemonClick: EventEmitter<Pokemon> = new EventEmitter();

  constructor(private router: Router ) {}

  pokemonCLick(): void {
    this.onPokemonClick.emit(this.pokemon);
    if(this.router.url === '/catalogue')
      alert("You have added " + this.pokemon?.name + ' to your collection')
  }
}
