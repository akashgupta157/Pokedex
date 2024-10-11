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



let allPokemonList = []; // Store all Pokémon names for local search

const getPokeList = async ({ limit, search, sort, type, gen, page = 1 }) => {
  setIsLoading(true);
  try {
    let pokeList = [];
    let results = [];
    const pageSize = limit || 20; // Number of Pokémon per page (pagination)

    // Pre-fetch all Pokémon names (cached in allPokemonList for subsequent searches)
    if (allPokemonList.length === 0) {
      let {
        data: { results: allPokemon },
      } = await axios.get(`${baseApi}/pokemon?limit=1025`);
      allPokemonList = allPokemon; // Cache all Pokémon names
    }

    // If search input exists (partial or full name search)
    if (search) {
      // Filter all cached Pokémon based on the search input (case insensitive)
      results = allPokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );

      // If no results from the partial name, clear the list
      if (results.length === 0) {
        setPokeList([]);
        setIsLoading(false);
        return;
      }

      // Fetch the details of the filtered Pokémon
      const pokeRequests = results.slice(0, limit).map((pokemon) =>
        axios.get(`${baseApi}/pokemon/${pokemon.name}`).catch(() => null) // Avoid breaking the loop if one request fails
      );
      const responses = await Promise.all(pokeRequests);

      pokeList = responses
        .filter((response) => response && response.data) // Filter out failed requests
        .map(({ data }) => ({
          id: data.id,
          name: data.name,
          type: data.types.map((type) => type.type.name),
          number: data.id.toString().padStart(4, "0"),
          image: data.sprites.other["official-artwork"].front_default,
          shinyImage: data.sprites.other["official-artwork"].front_shiny,
        }));

    } else {
      // Filter by type, generation, pagination, and sorting (as in the previous code)
      if (type) {
        const {
          data: { pokemon },
        } = await axios.get(`${baseApi}/type/${type}`);
        results = pokemon.map((p) => ({ name: p.pokemon.name }));
        setTotalPokemon(results.length);
      } else {
        results = allPokemonList; // Use cached Pokémon list
      }

      if (gen) {
        const {
          data: { pokemon_species },
        } = await axios.get(`${baseApi}/generation/${gen}`);
        const genPokemonNames = pokemon_species.map((p) => p.name);
        results = results.filter((pokemon) =>
          genPokemonNames.includes(pokemon.name)
        );
        setTotalPokemon(results.length);
      }

      if (sort === "higher") {
        results.reverse();
      }
      if (sort === "asc") {
        results.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (sort === "desc") {
        results.sort((a, b) => b.name.localeCompare(a.name));
      }

      const offset = (page - 1) * pageSize;
      const paginatedResults = results.slice(offset, offset + pageSize);

      const pokeRequests = paginatedResults.map((pokemon) =>
        axios.get(`${baseApi}/pokemon/${pokemon.name}`).catch(() => null) // Avoid breaking the loop if one request fails
      );
      const responses = await Promise.all(pokeRequests);

      pokeList = responses
        .filter((response) => response && response.data) // Filter out failed requests
        .map(({ data }) => ({
          id: data.id,
          name: data.name,
          type: data.types.map((type) => type.type.name),
          number: data.id.toString().padStart(4, "0"),
          image: data.sprites.other["official-artwork"].front_default,
          shinyImage: data.sprites.other["official-artwork"].front_shiny,
        }));
    }

    setPokeList(pokeList);
  } catch (error) {
    setPokeList([]);
    alert("Failed to load Pokémon. Please try again later.");
    console.error("Error fetching Pokémon:", error);
  } finally {
    setIsLoading(false);
  }
};
