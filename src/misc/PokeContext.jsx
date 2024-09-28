import axios from "axios";
import { createContext, useState, useMemo } from "react";

export const PokeContext = createContext();

export function PokeProvider({ children }) {
  const baseApi = "https://pokeapi.co/api/v2";
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPokemon, setTotalPokemon] = useState(1302);

  const typeColors = useMemo(
    () => ({
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
    }),
    []
  );
  const bgTypeColors = useMemo(
    () => ({
      grass: "linear-gradient(135deg, #A8FF78 0%, #51bd1b 100%)",
      fire: "linear-gradient(135deg, #FFAC78 0%, #f26e0f 100%)",
      water: "linear-gradient(135deg, #89CFF0 0%, #2962e7 100%)",
      bug: "linear-gradient(135deg, #C0D890 0%, #acbd12 100%)",
      normal: "linear-gradient(135deg, #D8D8B8 0%, #96966b 100%)",
      poison: "linear-gradient(135deg, #D880D8 0%, #933093 100%)",
      electric: "linear-gradient(135deg, #FFDC78 0%, #facd1a 100%)",
      ground: "linear-gradient(135deg, #EBD090 0%, #c3a552 100%)",
      fairy: "linear-gradient(135deg, #FFCADC 0%, #f07c95 100%)",
      fighting: "linear-gradient(135deg, #E06058 0%, #c2231b 100%)",
      psychic: "linear-gradient(135deg, #FF90A8 0%, #f6316c 100%)",
      rock: "linear-gradient(135deg, #D8C078 0%, #a7912f 100%)",
      ghost: "linear-gradient(135deg, #A090C0 0%, #593397 100%)",
      ice: "linear-gradient(135deg, #C8F0F0 0%, #6dd9d9 100%)",
      dragon: "linear-gradient(135deg, #A090FF 0%, #601dfa 100%)",
      dark: "linear-gradient(135deg, #A09078 0%, #624b3c 100%)",
      steel: "linear-gradient(135deg, #D0D0E0 0%, #ababbc 100%)",
      flying: "linear-gradient(135deg, #C8C8F0 0%, #9179da 100%)",
    }),
    []
  );
  const getPokeList = async ({ limit, search, sort, type, gen }) => {
    setIsLoading(true);
    try {
      let pokeList = [];
      let results = [];

      if (search) {
        try {
          const { data } = await axios.get(`${baseApi}/pokemon/${search.toLowerCase()}`);
          pokeList.push({
            id: data.id,
            name: data.name,
            type: data.types.map((type) => type.type.name),
            number: data.id.toString().padStart(4, "0"),
            image: data.sprites.other["official-artwork"].front_default,
            shinyImage: data.sprites.other["official-artwork"].front_shiny,
          });
        } catch (error) {
          pokeList = [];
        }
      } else {
        let {
          data: { results: allPokemon },
        } = await axios.get(`${baseApi}/pokemon?limit=1025`);

        if (type) {
          const {
            data: { pokemon },
          } = await axios.get(`${baseApi}/type/${type}`);
          results = pokemon.map((p) => ({ name: p.pokemon.name }));
          setTotalPokemon(results.length);
        } else {
          results = allPokemon;
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

        const pokeRequests = results
          .slice(0, limit)
          .map((pokemon) => axios.get(`${baseApi}/pokemon/${pokemon.name}`));
        const responses = await Promise.all(pokeRequests);

        pokeList = responses.map(({ data }) => ({
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

  return (
    <PokeContext.Provider
      value={{
        baseApi,
        pokeList,
        isLoading,
        typeColors,
        getPokeList,
        totalPokemon,
        bgTypeColors,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
}
