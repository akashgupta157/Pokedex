import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { typeSymbols } from "../misc/misce";
import { PokeContext } from "../misc/PokeContext";
import { ChevronDown, ChevronRight } from "lucide-react";
export const EvolutionChainDisplay = ({ chain }) => {
  const { typeColors } = useContext(PokeContext);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const fetchPokemonDetails = async (name) => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      return {
        id: data.id,
        number: data.id.toString().padStart(4, "0"),
        image: data.sprites.other["official-artwork"].front_default,
        type: data.types.map((type) => type.type.name),
      };
    } catch (error) {
      console.error("Error fetching Pokémon details: ", error);
      return null;
    }
  };
  useEffect(() => {
    const getPokemonDetails = async () => {
      const details = await fetchPokemonDetails(chain.species.name);
      setPokemonDetails(details);
    };
    getPokemonDetails();
  }, [chain.species.name]);
  if (!pokemonDetails) return null;
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center my-2">
      <a
        className="flex flex-col items-center overflow-hidden"
        href={`http://localhost:5173/detail/${chain.species.name}/${pokemonDetails.id}`}
      >
        <LazyLoadImage
          src={pokemonDetails.image}
          alt={chain.species.name}
          width={600}
          height={400}
          className="md:w-36 w-28"
        />
        <div className="text-center mt-2 flex items-end gap-2">
          <p className="capitalize font-semibold">{chain.species.name}</p>
          <p className="text-sm text-gray-500">#{pokemonDetails.number}</p>
        </div>
        <div className="flex gap-2 mt-2">
          {pokemonDetails.type.map((type) => (
            <span
              key={type}
              className="text-white flex text-sm items-center gap-1 rounded-lg px-2 py-1 capitalize"
              style={{
                backgroundColor: typeColors[type],
              }}
            >
              <img src={typeSymbols(type)} alt={type} className="w-4" />
              {type}
            </span>
          ))}
        </div>
      </a>

      {chain.evolves_to.length > 0 && (
        <>
          <ChevronRight
            className="mx-4 hidden md:block text-gray-500"
            size={50}
          />
          <ChevronDown
            className="mx-4 md:hidden block text-gray-500"
            size={50}
          />
        </>
      )}
      <div>
        {chain.evolves_to.map((evolution, index) => (
          <EvolutionChainDisplay key={index} chain={evolution} />
        ))}
      </div>
    </div>
  );
};
