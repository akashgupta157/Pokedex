import { PokeContext } from "../misc/PokeContext";
import React, { useContext, useState } from "react";
import shiny from "../assets/Shiny_Pok%3Fmon.webp";
import pokeBall from "../assets/bg-pokeball.png";
import { useNavigate } from "react-router";
import { typeSymbols } from "../misc/misce";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function PokeCard({ poke }) {
  const { typeColors } = useContext(PokeContext);
  const [currentImage, setCurrentImage] = useState(poke.image);
  const navigate = useNavigate();
  return (
    <div
      className="relative md:px-5 p-2 transition-all bg-white rounded-lg cursor-pointer md:hover:scale-105 md:hover:shadow-2xl"
      onClick={() =>
        navigate(`/detail/${poke.name}/${poke.id}`, { state: poke })
      }
    >
      <div className="absolute top-0 left-0 overflow-hidden rounded-tl-lg opacity-50 w-36 md:w-52">
        <img
          src={pokeBall}
          alt="PokeBall watermark"
          className="object-cover transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
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
      <div className="flex justify-end relative">
        <div className="absolute left-0 bottom-0">
          <p className="text-[#878396] text-sm font-bold">#{poke.number}</p>
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
          src={currentImage || poke.image}
          width={600}
          height={400}
          alt={poke.name}
          className={`object-contain w-44 md:w-56 ${
            currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
