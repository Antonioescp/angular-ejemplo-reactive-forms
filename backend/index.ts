import express from 'express';
import settings from './settings';
import pokemonRouter from './routes/PokemonRouter';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pokemonRouter);

app.listen(settings.port, () => {
  console.log(`Listening to http://localhost:${settings.port}`);
});
