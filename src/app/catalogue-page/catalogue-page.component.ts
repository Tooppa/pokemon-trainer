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
    console.log(this.pokemonService.pokemon$());
    
    return this.pokemonService.pokemon$();
  }


  ngOnInit(): void {
    this.pokemonService.getPokemon(0,200);
  }

}
