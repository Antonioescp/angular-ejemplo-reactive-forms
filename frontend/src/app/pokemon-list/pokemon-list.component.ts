import { Component } from '@angular/core';
import { PokemonPage, PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {

  constructor(
    private pokemonService: PokemonService
  ) {}

  public get currentPage(): PokemonPage | null {
    return this.pokemonService.currentPage;
  }

  onNextPage(): void {
    this.pokemonService.getNextPage();
  }

  onPreviousPage(): void {
    this.pokemonService.getPreviousPage();
  }
  
}
