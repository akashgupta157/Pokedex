import normal from "../assets/normal.svg";
import fire from "../assets/fire.svg";
import water from "../assets/water.svg";
import grass from "../assets/grass.svg";
import electric from "../assets/electric.svg";
import ice from "../assets/ice.svg";
import fighting from "../assets/fighting.svg";
import poison from "../assets/poison.svg";
import ground from "../assets/ground.svg";
import flying from "../assets/flying.svg";
import psychic from "../assets/psychic.svg";
import bug from "../assets/bug.svg";
import rock from "../assets/rock.svg";
import ghost from "../assets/ghost.svg";
import dragon from "../assets/dragon.svg";
import dark from "../assets/dark.svg";
import steel from "../assets/steel.svg";
import fairy from "../assets/fairy.svg";
import axios from "axios";
export const typeSymbols = (type) => {
  switch (type) {
    case "fire":
      return fire;
    case "water":
      return water;
    case "grass":
      return grass;
    case "electric":
      return electric;
    case "ice":
      return ice;
    case "fighting":
      return fighting;
    case "poison":
      return poison;
    case "ground":
      return ground;
    case "flying":
      return flying;
    case "psychic":
      return psychic;
    case "bug":
      return bug;
    case "rock":
      return rock;
    case "ghost":
      return ghost;
    case "dragon":
      return dragon;
    case "dark":
      return dark;
    case "steel":
      return steel;
    case "fairy":
      return fairy;
    default:
      return normal;
  }
};
export const fetchTypeEffectiveness = async (types) => {
  try {
    const responses = await Promise.all(
      types.map((type) => axios.get(`https://pokeapi.co/api/v2/type/${type}`))
    );

    const combinedDamageRelations = {
      double_damage_from: [],
      half_damage_from: [],
      no_damage_from: [],
    };

    responses.forEach((response) => {
      const damageRelations = response.data.damage_relations;
      combinedDamageRelations.double_damage_from.push(
        ...damageRelations.double_damage_from.map((t) => t.name)
      );
      combinedDamageRelations.half_damage_from.push(
        ...damageRelations.half_damage_from.map((t) => t.name)
      );
      combinedDamageRelations.no_damage_from.push(
        ...damageRelations.no_damage_from.map((t) => t.name)
      );
    });

    const damageMultipliers = {};
    const applyMultiplier = (type, multiplier) => {
      if (damageMultipliers[type]) {
        damageMultipliers[type] *= multiplier;
      } else {
        damageMultipliers[type] = multiplier;
      }
    };

    combinedDamageRelations.double_damage_from.forEach((type) =>
      applyMultiplier(type, 2)
    );
    combinedDamageRelations.half_damage_from.forEach((type) =>
      applyMultiplier(type, 0.5)
    );
    combinedDamageRelations.no_damage_from.forEach((type) =>
      applyMultiplier(type, 0)
    );

    const strongWeaknesses = [];
    const weaknesses = [];
    const resistances = [];
    const strongResistances = [];

    Object.entries(damageMultipliers).forEach(([type, multiplier]) => {
      if (multiplier === 4) {
        strongWeaknesses.push(type);
      } else if (multiplier === 2) {
        weaknesses.push(type);
      } else if (multiplier === 0.5) {
        resistances.push(type);
      } else if (multiplier === 0.25) {
        strongResistances.push(type);
      }
    });

    return {
      strongWeaknesses,
      weaknesses,
      resistances,
      strongResistances,
    };
  } catch (error) {
    console.error("Error fetching type effectiveness:", error);
  }
};
export const fetchPokemonDetails = async (name) => {
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return {
      id: data.id,
      number: data.id.toString().padStart(4, "0"),
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
      shinyImage: data.sprites.other["official-artwork"].front_shiny,
      type: data.types.map((type) => type.type.name),
    };
  } catch (error) {
    console.error("Error fetching Pokémon details: ", error);
    return null;
  }
};
