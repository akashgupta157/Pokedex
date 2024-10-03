import React, { useContext, useEffect, useState } from "react";
import { PokeContext } from "../misc/PokeContext";
import PokeCard from "../Components/PokeCard";
import pokeBall from "../assets/pokeball.png";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { typeSymbols } from "../misc/misce";
export default function Home() {
  const { getPokeList, pokeList, isLoading, totalPokemon, typeColors } =
    useContext(PokeContext);
  const [wholeLoading, setWholeLoading] = useState(false);
  const [limit, setLimit] = useState(30);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("lower");
  const [typeSelected, setTypeSelected] = useState(null);
  const [genSelected, setGenSelected] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    "kanto I",
    "johto II",
    "hoenn III",
    "sinnoh IV",
    "unova V",
    "kalos VI",
    "alola VII",
    "galar VIII",
    "paldea IX",
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    setWholeLoading(false);
    if (!search) return;
    getPokeList({ search });
    setSearch("");
  };
  const handleSearch = () => {
    getPokeList({ limit, sort, type: typeSelected, gen: genSelected });
  };
  useEffect(() => {
    getPokeList({ limit, sort, type: typeSelected, gen: genSelected });
  }, [limit, sort]);
  const handleReset = () => {
    setSort("lower");
    setGenSelected(null);
    setTypeSelected(null);
    getPokeList({ limit: 30, sort: "lower", type: null, gen: null });
  };
  return (
    <>
      <div className="bg-[#473645] px-5 py-2 md:px-20 md:py-3">
        <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
          <form
            action=""
            className="flex items-center gap-2 md:gap-5"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search by name or number"
              className="bg-[#e6e5f6] p-2 rounded md:w-80"
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
            <p className="text-[#c4c2cc] text-lg md:text-xl font-medium">
              Sort by
            </p>
            <select
              name="sort"
              id="sort"
              onChange={(e) => {
                setWholeLoading(false);
                setSort(e.target.value);
              }}
              value={sort}
              className="bg-[#e6e5f6] p-2 rounded"
            >
              <option value="lower">Lowest Number (First)</option>
              <option value="higher">Highest Number (First)</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            isDrawerOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="flex flex-col gap-2 md:gap-3 mt-2 md:mt-3">
            <h1 className="text-[#c4c2cc] text-lg md:text-xl font-medium">
              Region/Generation
            </h1>
            <div className="md:flex grid grid-cols-3 gap-1 rounded w-fit ">
              {genArr.map((gen, i) => (
                <button
                  key={i}
                  className="bg-white border-2 rounded px-3 border-blue-600 font-medium capitalize"
                  onClick={() => setGenSelected(i + 1)}
                >
                  {gen}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 md:gap-3 mt-2 md:mt-3 ">
            <h1 className="text-[#c4c2cc] text-lg md:text-xl font-medium">
              Type
            </h1>
            <div className="md:flex grid grid-cols-5 gap-3">
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
          <div className="flex justify-center md:justify-end items-center gap-10 mt-3 mb-1 md:mt-5 md:mb-2">
            <button
              className="text-white px-5 py-1 md:py-2 md:px-10 font-bold md:text-xl rounded bg-[#a5a4a5]"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 text-white px-5 py-1 md:py-2 md:px-10 font-bold text-xl rounded bg-red-600"
            >
              <Search />
              Search
            </button>
          </div>
        </div>
        </div>
      </div>
      <div className="bg-[#e6e5f6]">
        <button
          className="flex items-center gap-2 bg-[#473645] w-fit mx-auto font-medium text-white px-10 md:px-20 py-1 [clip-path:polygon(0_0,100%_0%,90%_100%,10%_100%)]"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          {isDrawerOpen ? (
            <>
              Hide Advanced Filters
              <ChevronUp />
            </>
          ) : (
            <>
              Show Advanced Filters <ChevronDown />
            </>
          )}
        </button>
      </div>
      <div className="bg-[#e6e5f6] py-5 md:py-10 min-h-[90vh] md:min-h-[85vh] max-w-[1280px] mx-auto">
        {isLoading && !wholeLoading ? (
          <div className="flex items-center justify-center">
            <img
              src={pokeBall}
              alt="Loading..."
              className="w-16 md:w-20 animate-spin"
            />
          </div>
        ) : (
          <>
            {!pokeList?.length && !isLoading && (
              <div className="flex flex-col gap-2 justify-center items-center">
                <h1 className="text-3xl font-bold text-center">
                  No Pokemon Found
                </h1>
                <button
                  className="text-white px-5 py-1 md:py-2 md:px-10 font-bold md:text-xl rounded bg-[#a5a4a5]"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 gap-5 mx-5 md:mx-20 md:grid-cols-3">
              {pokeList?.map((poke) => (
                <PokeCard key={poke.id} poke={poke} />
              ))}
            </div>
            <div className="mt-10">
              {pokeList.length >= 30 && pokeList.length < totalPokemon && (
                <>
                  {isLoading ? (
                    <button className="mx-auto block text-white bg-[#31a7d6] rounded px-5 py-1">
                      Loading Pokemon...
                    </button>
                  ) : (
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
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
