import { PokeContext } from "../misc/PokeContext";
import React, { useContext, useState } from "react";
import shiny from "../assets/Shiny_Pok%3Fmon.webp";
import pokeBall from "../assets/bgPokeball.png";
import noPokemon from "../assets/no_pokemon.png";
import { useNavigate } from "react-router";
import { typeSymbols } from "../misc/misce";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function PokeCard({ poke }) {
  const { typeColors, bgTypeColors } = useContext(PokeContext);
  const [currentImage, setCurrentImage] = useState(poke.image);
  const navigate = useNavigate();
  return (
    <div
      className={`relative md:px-5 p-2 transition-all bg-white rounded-lg cursor-pointer md:hover:scale-105 md:hover:shadow-2xl`}
      onClick={() =>
        navigate(`/detail/${poke.name}/${poke.id}`)
      }
      style={{
        background: bgTypeColors[poke.type[0]] || "#ffffff",
      }}
    >
      <div className="absolute top-[10%] right-0 overflow-hidden rounded-tl-lg opacity-25 w-36 md:w-52">
        <img
          src={pokeBall}
          alt="PokeBall watermark"
          className="object-cover transform translate-x-1/3 -rotate-45"
        />
      </div>
      {poke.shinyImage && (
        <div className="relative">
          <img
            src={shiny}
            alt="shiny"
            className="absolute top-0 right-0 w-10 z-10"
            onMouseOver={() => setCurrentImage(poke.shinyImage)}
            onMouseOut={() => setCurrentImage(poke.image)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <div className="flex justify-end relative">
        <div className="absolute left-0 bottom-0">
          <p className="text-white text-sm font-bold">#{poke.number}</p>
          <h1 className="text-2xl font-semibold capitalize">{poke.name}</h1>
          <div className="flex gap-2">
            {poke.type.map((type, index) => (
              <button
                className="text-white text-sm mt-1 mb-5 font-semibold px-1.5 py-0.5 rounded capitalize flex items-center gap-1"
                key={index}
                style={{ backgroundColor: typeColors[type] || "#A8A878" }}
              >
                <img src={typeSymbols(type)} alt="" className="w-4" />
                {type}
              </button>
            ))}
          </div>
        </div>
        <LazyLoadImage
          src={currentImage || noPokemon}
          width={600}
          height={400}
          alt={poke.name}
          className={`object-contain w-44 md:w-56 
            ${currentImage ? "opacity-100" : "opacity-0"}
            `}
        />
      </div>
    </div>
  );
}
