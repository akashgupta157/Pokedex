import axios from "axios";
import { createContext, useState } from "react";

export const PokeContext = createContext();

export function PokeProvider({ children }) {
  const baseApi = "https://pokeapi.co/api/v2";
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const typeColors = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    flying: "#A890F0",
  };

  const getGeneration = (id) => {
    if (id <= 151) return 1;
    if (id <= 251) return 2;
    if (id <= 386) return 3;
    if (id <= 493) return 4;
    if (id <= 649) return 5;
    if (id <= 721) return 6;
    if (id <= 809) return 7;
    if (id <= 905) return 8;
    if (id <= 1025) return 9;
  };

  const getPokeList = async ({ limit, search, sort }) => {
    setIsLoading(true);
    try {
      let pokeList = [];
      if (search) {
        const { data } = await axios.get(`${baseApi}/pokemon/${search}`);
        pokeList.push({
          id: data.id,
          name: data.name,
          type: data.types.map((type) => type.type.name),
          number: data.id.toString().padStart(4, "0"),
          image: data.sprites.other["official-artwork"].front_default,
          shinyImage: data.sprites.other["official-artwork"].front_shiny,
          generation: getGeneration(data.id),
        });
      } else {
        const {
          data: { results },
        } = await axios.get(`${baseApi}/pokemon?limit=1025`);
        if (sort === "higher") {
          results.reverse();
        }
        if (sort === "asc") {
          results.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (sort === "desc") {
          results.sort((a, b) => b.name.localeCompare(a.name));
        }
        for (let i = 0; i < results.slice(0, limit).length; i++) {
          const { data } = await axios.get(
            `${baseApi}/pokemon/${results[i].name}`
          );
          pokeList.push({
            id: data.id,
            name: data.name,
            type: data.types.map((type) => type.type.name),
            number: data.id.toString().padStart(4, "0"),
            image: data.sprites.other["official-artwork"].front_default,
            shinyImage: data.sprites.other["official-artwork"].front_shiny,
            generation: getGeneration(data.id),
          });
        }
      }
      setPokeList(pokeList);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PokeContext.Provider
      value={{
        baseApi,
        pokeList,
        isLoading,
        typeColors,
        getPokeList,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
}
