const mongoose1 = require("mongoose");
const pokemonSchema = new mongoose1.Schema(
  {
    name: { type: String, required: true, unique: true },
    number: { type: Number, unique: true },
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
    weaknesses: [String],
    height: Number,
    weight: Number,
    evolution: [Number],
  },
  { timestamps: true }
);

module.exports = mongoose1.model("Pokemon", pokemonSchema);
