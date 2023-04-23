import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { NewPokemonComponent } from './new-pokemon/new-pokemon.component';

const routes: Routes = [
  { path: 'pokemon/nuevo', component: NewPokemonComponent },
  { path: 'pokemon/:name', component: PokemonCardComponent },
  { path: '', component: PokemonListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
