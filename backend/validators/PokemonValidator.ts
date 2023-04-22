import Joi from 'joi';

const pokemonSchema = Joi.object({
  name: Joi.string().required(),
  sprites: Joi.object({
    front_default: Joi.string().allow(null),
    back_default: Joi.string().allow(null),
  }).required(),
  types: Joi.array<{ slot: number; type: { name: string } }>().required().min(1)
});

export { pokemonSchema };