import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import pokeBall from "../assets/pokeball.png";
import { typeSymbols } from "../misc/misce";
import { PokeContext } from "../misc/PokeContext";
export default function Detail() {
  const { typeColors } = useContext(PokeContext);
  const { id, pokemon } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const [pokeDetails, setPokeDetails] = useState();
  const fetchPokeDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const { abilities: apiAbilities, stats: apiStats, height, weight } = data;
      const abilities = apiAbilities.map((ability) => ability.ability.name);
      const stats = apiStats.map((stat) => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
      }));
      let species;
      res.data.genera.map((g) => {
        if (g.language.name === "en") {
          species = g.genus;
        }
      });
      let varieties = [];
      res.data.varieties.map((v) => {
        if (v.pokemon.name !== pokemon) {
          varieties.push({ name: v.pokemon.name, url: v.pokemon.url });
        }
      });
      let flavor_text = [];
      res.data.flavor_text_entries.map((f) => {
        if (f.language.name === "en") {
          flavor_text.push({
            text: f.flavor_text.split("\f").join(" "),
            version: f.version.name,
          });
        }
      });
      setPokeDetails({
        ...state,
        abilities,
        stats,
        species,
        flavor_text,
        generation: res.data.generation.name,
        is_legendary: res.data.is_legendary,
        is_mythical: res.data.is_mythical,
        color: res.data.color.name,
        varieties,
        height: (height / 10).toFixed(1),
        weight: (weight / 10).toFixed(1),
      });
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      alert("Error fetching Pokémon details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPokeDetails();
  }, [id]);
  console.log(pokeDetails);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-10 md:mt-32">
          <div className="animate-spin">
            <img src={pokeBall} alt="" className="w-20 md:w-28" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
