import React, { useContext, useEffect, useState } from "react";
import { PokeContext } from "../misc/PokeContext";
import PokeCard from "../Components/PokeCard";
import pokeBall from "../assets/pokeball.png";
import { Search } from "lucide-react";
import { typeSymbols } from "../misc/misce";
export default function Home() {
  const { getPokeList, pokeList, isLoading, totalPokemon, typeColors } =
    useContext(PokeContext);
  const [wholeLoading, setWholeLoading] = useState(false);
  const [limit, setLimit] = useState(30);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("lower");
  const [typeSelected, setTypeSelected] = useState(null);
  const typeArr = [
    "grass",
    "fire",
    "water",
    "bug",
    "normal",
    "poison",
    "electric",
    "ground",
    "fairy",
    "fighting",
    "psychic",
    "rock",
    "ghost",
    "ice",
    "dragon",
    "dark",
    "steel",
    "flying",
  ];
  const genArr = [
    "Kanto I",
    "Johto II",
    "Hoenn III",
    "Sinnoh IV",
    "Unova V",
    "Kalos VI",
    "Alola VII",
    "Galar VIII",
    "Paldea IX",
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    setWholeLoading(false);
    if (!search) return;
    getPokeList({ search });
    setSearch("");
  };
  const handleSearch = () => {
    getPokeList({ limit, sort, type: typeSelected });
  };
  useEffect(() => {
    getPokeList({ limit, sort, type: typeSelected });
  }, [limit, sort]);
  return (
    <>
      <div className="bg-[#473645] px-20 py-3">
        <div className="flex justify-between items-center">
          <form
            action=""
            className="flex items-center gap-5"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search by name or number"
              className="bg-[#e6e5f6] p-2 rounded w-80"
              required
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#e40726] text-white p-2 rounded"
            >
              <Search />
            </button>
          </form>
          <div className="flex gap-5 items-center">
            <p className="text-[#c4c2cc] text-xl font-medium">Sort by</p>
            <select
              name="sort"
              id="sort"
              onChange={(e) => {
                setWholeLoading(false);
                setSort(e.target.value);
              }}
              className="bg-[#e6e5f6] p-2 rounded"
            >
              <option value="lower">Lowest Number (First)</option>
              <option value="higher">Highest Number (First)</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-3 my-3">
            <h1 className="text-[#c4c2cc] text-xl font-medium">
              Region/Generation
            </h1>
            <div className="flex gap-1 rounded w-fit">
              {genArr.map((gen, i) => (
                <button
                  key={i}
                  className="bg-white border-2 rounded px-3 border-blue-600 font-medium"
                >
                  {gen}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-[#c4c2cc] text-xl font-medium">Type</h1>
            <div className="flex gap-3">
              {typeArr.map((type, i) => (
                <button
                  key={i}
                  className={`w-12 h-12 rounded-full flex justify-center items-center`}
                  style={{ backgroundColor: typeColors[type] || "#A8A878" }}
                  onClick={() => setTypeSelected(type)}
                >
                  <img src={typeSymbols(type)} alt="" className="w-8 " />
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end items-center gap-10 mt-5 mb-2">
            <button className="text-white py-2 px-10 font-bold text-xl rounded bg-[#a5a4a5]">
              Reset
            </button>
            <button
              onClick={() => handleSearch()}
              className="flex items-center gap-2 text-white py-2 px-10 font-bold text-xl rounded bg-red-600"
            >
              <Search />
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#e6e5f6] py-5 md:py-10 min-h-[90vh] md:min-h-[85vh]">
        {isLoading && !wholeLoading ? (
          <div className="flex items-center justify-center">
            <img
              src={pokeBall}
              alt="Loading..."
              className="w-20 h-20 animate-spin"
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 mx-5 md:mx-20 md:grid-cols-3">
              {pokeList?.map((poke) => (
                <PokeCard key={poke.id} poke={poke} />
              ))}
            </div>
            <div className="mt-10">
              {pokeList.length >= 30 && pokeList.length < totalPokemon && (
                <button
                  onClick={() => {
                    setWholeLoading(true);
                    setLimit(limit + 30);
                  }}
                  className="mx-auto block text-white bg-[#31a7d6] rounded px-5 py-1"
                >
                  Load More Pokemon
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
