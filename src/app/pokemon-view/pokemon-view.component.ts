import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss']
})
export class PokemonViewComponent implements OnInit {
  @Input() pokemon: Pokemon | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  pokemonCLick(): void {
    console.log(this.pokemon?.name + ' clicked');
  }
}
