import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonFacade } from '../services/pokemon/pokemon.facade';
import { TrainerFacade } from '../services/trainer/trainer.facade';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.scss'],
})
export class CataloguePageComponent implements OnInit {
  constructor(private readonly pokemonFacade: PokemonFacade, private readonly trainerFacade: TrainerFacade) {}

  get pokemon$(): Observable<Pokemon[]> {
    return this.pokemonFacade.pokemon$();
  }
  page: number = 1;
  private items: number = 48;

  turnPage(forward: boolean): void {
    if (
      (forward && this.page > 0 && this.page < 24) ||
      (!forward && this.page > 1)
    ) {
      this.page += forward ? 1 : -1;
      this.pokemonFacade.getMorePokemons(
        (this.page - 1) * this.items,
        this.items
      );
    }
  }

  onClickPokemon(pokemon: Pokemon): void {
    this.trainerFacade.addNewPokemon(pokemon);
  }

  ngOnInit(): void {
    this.pokemonFacade.getPokemon(this.page, this.items);
  }
}
