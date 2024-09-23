import React, { useContext, useEffect, useState } from "react";
import { PokeContext } from "../misc/PokeContext";
import PokeCard from "../Components/PokeCard";
import pokeBall from "../assets/pokeball.png";
import { Search } from "lucide-react";
export default function Home() {
  const { getPokeList, pokeList, isLoading } = useContext(PokeContext);
  const [limit, setLimit] = useState(30);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("lower");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    getPokeList({ search });
    setSearch("");
  };
  useEffect(() => {
    getPokeList({ limit, sort });
  }, [limit, sort]);
  return (
    <>
      <div className="bg-[#473645] px-20 py-3 flex justify-between items-center">
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
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-[#e40726] text-white p-2 rounded">
            <Search />
          </button>
        </form>
        <div className="flex gap-5 items-center">
          <p className="text-[#c4c2cc] text-xl font-medium">Sort by</p>
          <select
            name="sort"
            id="sort"
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#e6e5f6] p-2 rounded"
          >
            <option value="lower">Lowest Number (First)</option>
            <option value="higher">Highest Number (First)</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>
      <div className="bg-[#e6e5f6] py-5 md:py-10 min-h-[90vh] md:min-h-[85vh]">
        {isLoading && pokeList.length === 0 ? (
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
              {isLoading && pokeList.length > 0 ? (
                <div className="flex justify-center animate-spin">
                  <img src={pokeBall} alt="" className="w-14 h-14" />
                </div>
              ) : (
                pokeList.length >= 30 && (
                  <button
                    onClick={() => {
                      setLimit(limit + 12);
                    }}
                    className="mx-auto block text-white bg-[#31a7d6] rounded px-5 py-1"
                  >
                    Load More Pokemon
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
