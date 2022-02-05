import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonFacade } from '../services/pokemon/pokemon.facade';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.scss']
})
export class TrainerPageComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(private readonly pokemonService: PokemonFacade) { }
  get pokemon$(): Observable<Pokemon[]> {
    return this.pokemonService.pokemon$();
  }

  ngOnInit(): void {
    this.pokemonService.getPokemon(0, 20);
  }

}
