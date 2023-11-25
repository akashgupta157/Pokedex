import { useEffect, useState } from 'react';
// import style from '../CSS/singlepokemon.module.scss';
import Loader from '../Components/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../Components/url';
export default function SinglePokemon() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    await axios.get(`${url}/pokemon/${id}`).then(res => setPokemon(res.data))
    setLoading(false)
  }
  console.log(pokemon)
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <>
      {
        loading ? <Loader /> : null
      }
    </>
  );
}
