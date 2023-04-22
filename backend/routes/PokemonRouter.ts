import { Router, Request, Response } from 'express';
import settings from '../settings';
import { Pokemon, PokemonPage } from '../models/Pokemon';
import { pokemonSchema } from '../validators/PokemonValidator';

const database: Pokemon[] = [];
const pokemonRouter = Router();

pokemonRouter.get('/pokemon', async (req: Request, res: Response) => {
  const url = `${settings.pokemonApiBaseUrl}${settings.pokemonEndpoint}`;
  const response = await fetch(url);
  const data: PokemonPage = await response.json();
  data.results = [...(database.map(p => ({ name: p.name }) )), ...data.results];

  if (response.ok) {
    res.status(200).json(data).end();
    return;
  }

  res.status(500).end();
});

pokemonRouter.get('/pokemon/:name', async (req: Request, res: Response) => {
  const url = `${settings.pokemonApiBaseUrl}${settings.pokemonEndpoint}${req.params.name}`;
  const response = await fetch(url);
  if (response.ok) {
    res.status(200).json(await response.json()).end();
    return;
  } else if (response.status === 404 && database.some(p => p.name === req.params.name)) {
    const pokemon = database.find(p => p.name === req.params.name);
    if (pokemon) {
      res.status(200).json(pokemon).end();
    }
  }

  res.status(response.status).end();
  return;
});

pokemonRouter.post('/pokemon', (req: Request, res: Response) => {
  const pokemon = req.body as Pokemon;
  const { error, value } = pokemonSchema.validate(pokemon);

  if (error === undefined) {
    database.push(value);
    res.status(201).json(value).end();
    return;
  }

  res.status(400).end();
});

export default pokemonRouter;