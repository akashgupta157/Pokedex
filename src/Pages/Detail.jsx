import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import pokeBall from "../assets/pokeball.png";
export default function Detail() {
  const { id, pokemon } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [pokeDetails, setPokeDetails] = useState();
  const { state } = useLocation();
  const fetchPokeDetails = async () => {
    // setIsLoading(true);
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokeDetails(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchPokeDetails();
  }, [id]);
  console.log(state);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-32">
          <div className="animate-spin">
            <img src={pokeBall} alt="" className="w-28 h-28" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center text-4xl gap-5 my-5">
            <h1 className="font-semibold text-center capitalize">{pokemon}</h1>
            <p className="text-[#878396] ">#{id.toString().padStart(4, "0")}</p>
          </div>
        </>
      )}
    </>
  );
}
