import React, { useEffect, useState } from "react";
import { fetchPokemonDetails } from "../misc/misce";
import shiny from "../assets/Shiny_Pok%3Fmon.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
const formatVarietyName = (varietyName) => {
  const nameParts = varietyName.split("-");
  const pokemonName = nameParts.shift();
  return `${nameParts.join(" ")} ${pokemonName}`;
};
export default function VarietyCard({ varieties }) {
  const [pokeDetails, setPokeDetails] = useState(null);
  const [currentImage, setCurrentImage] = useState();
  useEffect(() => {
    fetchPokemonDetails(varieties.name)
      .then((details) => {
        setPokeDetails(details);
        setCurrentImage(details.image);
      })
      .catch((err) => console.log(err));
  }, [varieties]);
  return (
    <div>
      {pokeDetails && (
        <div className="md:hover:scale-105 md:hover:shadow-2xl md:px-5 md:p-2 transition-all rounded-lg">
          {pokeDetails.shinyImage && (
            <div className="relative">
              <img
                src={shiny}
                alt="shiny"
                className="absolute top-0 right-0 w-10 z-10"
                onMouseOver={() => setCurrentImage(pokeDetails.shinyImage)}
                onMouseOut={() => setCurrentImage(pokeDetails.image)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <LazyLoadImage
            src={currentImage}
            width={600}
            height={400}
            alt={pokeDetails.name}
            className="object-contain w-44 md:w-56"
          />
          <h1 className="text-center capitalize mt-2 font-semibold text-xl">
            {formatVarietyName(varieties.name)}
          </h1>
        </div>
      )}
    </div>
  );
}
