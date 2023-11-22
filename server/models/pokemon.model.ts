import mongoose from "mongoose";
const pokemonSchema = new mongoose.Schema({
  name: String,
  number: Number,
  classification: String,
  image: String,
  ability: String,
  stats: {
    hp: Number,
    attack: Number,
    defense: Number,
    specialAttack: Number,
    specialDefense: Number,
    speed: Number,
  },
  types: [String],
  weaknesses: {
    type: [
      {
        type: String,
      },
    ],
  },
  height: Number,
  weight: Number,
});
const Pokemon = mongoose.model("Pokemon", pokemonSchema);
export default Pokemon;
