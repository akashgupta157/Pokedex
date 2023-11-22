import mongoose, { Document, Schema } from "mongoose";

interface IPokemon extends Document {
  name: string;
  number: number;
  classification: string;
  image: string;
  ability: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  types: string[];
  weaknesses: string[];
  height: number;
  weight: number;
  evolutions: Schema.Types.ObjectId[];
}

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: Number, required: true },
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
  types: { type: [String], required: true },
  weaknesses: { type: [String] },
  height: Number,
  weight: Number,
  evolutions: [{ type: Schema.Types.ObjectId, ref: "Pokemon" }],
});

const Pokemon = mongoose.model<IPokemon>("Pokemon", pokemonSchema);

export default Pokemon;
