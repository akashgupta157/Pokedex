import { useContext } from "react";
import { PokeContext } from "../misc/PokeContext";
import { typeSymbols } from "../misc/misce";

export const TypeEffectivenessSection = ({ title, types }) => {
  if (!types.length) return null;
  const { typeColors } = useContext(PokeContext);
  return (
    <div>
      <h1 className="text-lg md:text-xl font-semibold mb-1">{title}</h1>
      <div className="flex flex-wrap gap-3">
        {types.map((type, i) => (
          <button
            key={i}
            className="text-white text-sm md:text-base font-semibold px-5 py-1 rounded capitalize flex items-center gap-1"
            style={{
              backgroundColor: typeColors[type] || "#A8A878",
            }}
          >
            <img
              src={typeSymbols(type)}
              alt={`${type} symbol`}
              className="w-4"
            />
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};
