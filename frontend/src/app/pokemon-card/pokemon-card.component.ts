import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  pokemon: Pokemon | null = null;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe( map => {
      this.pokemonService.getPokemon(map['name']).subscribe(
        res => this.pokemon = res
      );
    });
  }

}
