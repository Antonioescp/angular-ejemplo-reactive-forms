import { Component } from '@angular/core';
import { Pokemon, PokemonService } from '../pokemon.service';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-pokemon',
  templateUrl: './new-pokemon.component.html',
  styleUrls: ['./new-pokemon.component.scss']
})
export class NewPokemonComponent {

  form: FormGroup;

  getErrors(
    control: AbstractControl,
    displayName: string,
    customMessages: { [key: string]: string } | null = null
  ): string[] {
    var errors: string[] = [];
    Object.keys(control.errors || {}).forEach((key) => {
      switch (key) {
        case 'required':
          errors.push(`${displayName} ${customMessages?.[key] ?? 'es requerido.'}`);
          break;
        case 'pattern':
          errors.push(`${displayName} ${customMessages?.[key] ?? 'contiene carácteres invalidos.'}`);
          break;
        case 'isDupeField':
          errors.push(`${displayName} ${customMessages?.[key] ?? 'ya existe: por favor escoja otro.'}`);
          break;
        default:
          errors.push(`${displayName} ${customMessages?.[key] ?? 'es invalido.'}`);
          break;
      }
    });
    return errors;
  }

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      front_default: new FormControl('', Validators.required),
      back_default: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Informacion incorrecta');
      return;
    }

    const { 
      name,
      front_default,
      back_default,
      type
    } = this.form.controls;

    const newPokemon = <Pokemon>{};
    newPokemon.name = name.value;
    newPokemon.sprites = { 
      front_default: front_default.value,
      back_default: back_default.value
    };
    newPokemon.types = [{ slot: 0, type: { name: type.value }}];

    this.pokemonService.addPokemon(newPokemon).subscribe(
      res => {
        console.log(`Pokemon agregado: ${res}`);
        this.router.navigate(['/']);
      }
    )
  }
}
