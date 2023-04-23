import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export interface PokemonPage {
  next: string | null;
  previous: string | null;
  results: Pick<Pokemon, 'name'>[];
}

export interface Pokemon {
  name: string;
  sprites: { front_default: string; back_default: string; },
  types: { slot: number; type: { name: string } }[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _currentPage: PokemonPage | null = null;

  public get currentPage(): PokemonPage | null {
    return this._currentPage;
  }

  constructor(
    private http: HttpClient
  ) { }

  init(): void {
    const url = `${environment.baseUrl}${environment.pokemonEndpoint}`;
    this.http.get<PokemonPage>(url).subscribe(
      res => this._currentPage = res
    );
  }

  getNextPage(): void {
    if (this.currentPage && this.currentPage.next) {
      this.http.get<PokemonPage>(this.currentPage.next).subscribe(
        res => this._currentPage = res
      );
    }
  }

  getPreviousPage(): void {
    if (this.currentPage && this.currentPage.previous) {
      this.http.get<PokemonPage>(this.currentPage.previous).subscribe(
        res => this._currentPage = res
      );
    }
  }

  getPokemon(name: string): Observable<Pokemon> {
    const url = `${environment.baseUrl+ environment.pokemonEndpoint + name}`;
    return this.http.get<Pokemon>(url);
  }
}
