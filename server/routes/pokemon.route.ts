const express1 = require("express");
const pokemonModel = require("../models/pokemon.model");
const router = express1.Router();
router.get("/", async (req: any, res: any) => {
  try {
    const pokemon = await pokemonModel.find();
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.get("/search", async (req: any, res: any) => {
  try {
    const { query } = req.query;
    const searchRegex = new RegExp(query, "i");
    const searchResults = await pokemonModel.find({
      $or: [
        { name: searchRegex },
        { types: { $in: [searchRegex] } },
        { number: parseInt(query) || 0 },
      ],
    });
    if (searchResults.length > 0) {
      res.json(searchResults);
    } else {
      res.status(404).json({ error: "No matching Pokemon found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.get("/:number", async (req: any, res: any) => {
  try {
    const pokemon = await pokemonModel.findOne({ number: req.params.number });
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ error: "Pokemon not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.post("/", async (req: any, res: any) => {
  try {
    const lastAddedPokemon = await pokemonModel
      .findOne()
      .sort({ createdAt: -1 });
    const number = lastAddedPokemon ? lastAddedPokemon.number + 1 : 1;
    req.body.number = number;
    const newPokemon = new pokemonModel(req.body);
    await newPokemon.save();
    res.json({
      msg: "Pokemon added",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
});
module.exports = router;
