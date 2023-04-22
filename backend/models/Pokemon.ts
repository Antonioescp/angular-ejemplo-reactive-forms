interface Pokemon {
  name: string;
  sprites: { front_default: string | null; back_default: string | null; };
  types: { slot: number; type: { name: string } }[];
}

interface PokemonPage {
  next: string | null;
  previous: string | null;
  results: Pick<Pokemon, 'name'>[];
}

export { Pokemon, PokemonPage };