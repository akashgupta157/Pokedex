import express, { Request, Response } from "express";
import Pokemon from "../models/pokemon.model";
const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ error: "Pokemon not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.post("/", async (req: Request, res: Response) => {
  try {
    const newPokemon = new Pokemon(req.body);
    const savedPokemon = await newPokemon.save();
    res.json(savedPokemon);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
