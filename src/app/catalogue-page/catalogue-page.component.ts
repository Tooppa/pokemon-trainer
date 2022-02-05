import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonFacade } from '../services/pokemon/pokemon.facade';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.scss']
})
export class CataloguePageComponent implements OnInit {
  constructor(private readonly pokemonService: PokemonFacade) { }

  get pokemon$(): Observable<Pokemon[]> {
    return this.pokemonService.pokemon$();
  }
  page: number = 1;
  private items: number = 48;

  turnPage(forward: boolean): void {
    if ((forward && this.page > 0 && this.page < 24) || (!forward && this.page > 1)) {
      this.page += forward ? 1 : -1;
      this.pokemonService.getMorePokemons((this.page-1 )* this.items, this.items);
    }
  }


  ngOnInit(): void {
    this.pokemonService.getPokemon(this.page, this.items);
  }

}
