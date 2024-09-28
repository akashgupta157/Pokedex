import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import pokeBall from "../assets/pokeball.png";
import { fetchTypeEffectiveness, typeSymbols } from "../misc/misce";
import { PokeContext } from "../misc/PokeContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { EvolutionChainDisplay } from "../Components/EvolutionChainDisplay";
import { TypeEffectivenessSection } from "../Components/TypeEffectivenessSection";
import VarietyCard from "../Components/VarietyCard";
export default function Detail() {
  const { typeColors } = useContext(PokeContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [pokeDetails, setPokeDetails] = useState();
  const fetchPokeDetails = async () => {
    try {
      // setIsLoading(true);
      const [{ data: pokemonData }, { data: speciesData }] = await Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      ]);
      const { data: evolutionData } = await axios.get(
        speciesData.evolution_chain.url
      );
      const abilities = pokemonData.abilities.map(({ ability, is_hidden }) => ({
        name: ability.name,
        is_hidden,
      }));
      const stats = pokemonData.stats.map(({ base_stat, stat }) => ({
        base_stat,
        name: stat.name,
      }));
      const species = speciesData.genera.find(
        ({ language }) => language.name === "en"
      )?.genus;
      const varieties = speciesData.varieties
        .filter(({ pokemon }) => pokemon.name !== pokemonData.name)
        .map(({ pokemon }) => ({
          name: pokemon.name,
          url: pokemon.url,
        }));
      const flavor_text = speciesData.flavor_text_entries
        .filter(({ language }) => language.name === "en")
        .map(({ flavor_text, version }) => ({
          text: flavor_text.replace(/\f/g, " "),
          version: version.name,
        }));
      const typeEffectiveness = await fetchTypeEffectiveness(
        pokemonData.types.map(({ type }) => type.name)
      );
      setPokeDetails({
        id: pokemonData.id,
        name: pokemonData.name,
        type: pokemonData.types.map(({ type }) => type.name),
        number: pokemonData.id.toString().padStart(4, "0"),
        image: pokemonData.sprites.other["official-artwork"].front_default,
        shinyImage: pokemonData.sprites.other["official-artwork"].front_shiny,
        abilities,
        stats,
        species,
        flavor_text,
        generation: speciesData.generation.name,
        is_legendary: speciesData.is_legendary,
        is_mythical: speciesData.is_mythical,
        varieties,
        height: (pokemonData.height / 10).toFixed(1),
        weight: (pokemonData.weight / 10).toFixed(1),
        typeEffectiveness,
        evolutions: evolutionData.chain,
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

  return (
    <>
      {isLoading || !pokeDetails ? (
        <div className="flex justify-center items-center mt-10 md:mt-32">
          <div className="animate-spin">
            <img src={pokeBall} alt="" className="w-20 md:w-28" />
          </div>
        </div>
      ) : (
        <div className="mx-5 my-3 md:mx-40 md:my-5">
          <h1 className="text-3xl md:text-4xl font-bold flex items-end gap-2 md:gap-4 capitalize">
            {pokeDetails.name}
            <p className="text-gray-500 text-2xl md:text-3xl">
              #{pokeDetails.number}
            </p>
          </h1>
          <div>
            <div className="flex flex-col md:flex-row md:gap-14 md:mt-3">
              <LazyLoadImage
                src={pokeDetails.image}
                alt={pokeDetails.name}
                width={600}
                height={400}
                className="object-contain w-60 m-auto md:m-0 md:w-80"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
                <div className="flex gap-2 md:gap-0 md:flex-col items-center md:items-start">
                  <p className="text-lg md:text-xl font-bold md:font-semibold">
                    Type:
                  </p>
                  <div className="flex gap-2">
                    {pokeDetails.type.map((type) => (
                      <span
                        key={type}
                        className="text-white flex items-center gap-1 rounded-lg px-2 py-1 capitalize"
                        style={{
                          backgroundColor: typeColors[type],
                        }}
                      >
                        <img src={typeSymbols(type)} alt="" className="w-4" />
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 md:gap-0 md:flex-col text-lg">
                  <p className="md:text-xl font-bold md:font-semibold">
                    Species:
                  </p>
                  <p className="md:text-3xl capitalize">
                    {pokeDetails.species}
                  </p>
                </div>
                <div className="flex gap-2 md:gap-0 md:flex-col text-lg">
                  <p className="text-lg md:text-xl font-bold md:font-semibold">
                    Height:
                  </p>
                  <p className="md:text-3xl">{pokeDetails.height} m</p>
                </div>
                <div className="flex gap-2 md:gap-0 md:flex-col text-lg ">
                  <p className="text-lg md:text-xl font-bold md:font-semibold">
                    Weight:
                  </p>
                  <p className="md:text-3xl">{pokeDetails.weight} kg</p>
                </div>
                <div className="flex gap-2 md:gap-0 md:flex-col text-lg">
                  <p className="md:text-xl font-bold md:font-semibold">
                    Generation:
                  </p>
                  <p className="md:text-3xl flex items-center gap-2">
                    Generation
                    <p className="uppercase">
                      {pokeDetails.generation.split("-")[1]}
                    </p>
                  </p>
                </div>
                <div className="flex gap-2 md:gap-0 md:flex-col text-lg">
                  <p className="md:text-xl font-bold md:font-semibold">
                    Abilities:
                  </p>
                  <div>
                    {pokeDetails.abilities.map((ability) => (
                      <p className="md:text-3xl capitalize" key={ability.name}>
                        {ability.name.split("-").join(" ")}
                        {ability.is_hidden && (
                          <span className="text-gray-500"> (Hidden)</span>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 w-full flex flex-col md:flex-row justify-between gap-5 md:gap-10">
              <div className="md:w-1/2">
                <h1 className="text-2xl md:text-3xl font-bold">Base Stats</h1>
                <div className="flex flex-col gap-2 md:gap-5">
                  {pokeDetails.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <p
                          className="text-sm md:text-base capitalize"
                          style={{
                            textTransform: `${
                              stat.name === "hp" && "uppercase"
                            }`,
                          }}
                        >
                          {stat.name.split("-").join(" ")}
                        </p>
                        <p className="text-sm md:text-base">{stat.base_stat}</p>
                      </div>
                      <div className="w-full h-4 rounded-lg bg-slate-300">
                        <div
                          className={`h-full rounded-lg ${
                            i % 2 === 0 ? "bg-red-500" : "bg-blue-500"
                          }`}
                          style={{
                            width: `${(stat.base_stat / 255) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 ">
                <h1 className="text-2xl md:text-3xl font-bold">
                  Type Defenses
                </h1>
                <div className="flex flex-col gap-2 md:gap-4">
                  <TypeEffectivenessSection
                    title="Strong Weaknesses (x4)"
                    types={pokeDetails.typeEffectiveness.strongWeaknesses}
                  />
                  <TypeEffectivenessSection
                    title="Weaknesses (x2)"
                    types={pokeDetails.typeEffectiveness.weaknesses}
                  />
                  <TypeEffectivenessSection
                    title="Resistances (x0.5)"
                    types={pokeDetails.typeEffectiveness.resistances}
                  />
                  <TypeEffectivenessSection
                    title="Strong Resistances (x0.25)"
                    types={pokeDetails.typeEffectiveness.strongResistances}
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mt-5">
                Evolutions
              </h1>
              <div className="flex">
                <EvolutionChainDisplay chain={pokeDetails.evolutions} />
              </div>
            </div>
            {pokeDetails.shinyImage && (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Shiny</h1>
                <LazyLoadImage
                  src={pokeDetails.shinyImage}
                  alt={pokeDetails.name}
                  width={600}
                  height={400}
                  className="object-contain w-60 m-auto md:m-0 md:w-80"
                />
              </div>
            )}
            {pokeDetails.varieties.length > 0 && (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Forms</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
                  {pokeDetails.varieties.map((variety) => (
                    <VarietyCard key={variety.name} varieties={variety} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
