import { useNavigate } from 'react-router-dom';
import style from '../CSS/home.module.scss'
import Loader from '../Components/Loader'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../Components/url';
import { useTheme } from '../ContextAPI/ThemeContext';
export default function Home() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    const { data } = await axios.get(`${url}/pokemon`)
    setData(data)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, []);
  function convertToFormat(number: number) {
    let result = number.toString().padStart(4, '0');
    return result;
  }
  const { isDarkMode } = useTheme();
  return (
    <>
      {
        loading ?
          <Loader /> :
          <div className={isDarkMode ? style.darkMode : style.lightMode}>
            <div className={style.grid}>
              {data.map((pokemon: any) => (
                <section key={pokemon.id} onClick={() => navigate(`/${pokemon.name}/${pokemon.number}`)}>
                  <img src={pokemon.image} alt={pokemon.name} />
                  <p>#{convertToFormat(pokemon.number)}</p>
                  <h1>{pokemon.name}</h1>
                  <div>
                    {
                      pokemon.types.map((type: any, index: number) => (
                        <p key={index} style={{
                          backgroundColor: type === 'Grass' ? '#79c851' : type === 'Fire' ? "#f18031" : type === 'Poison' ? "#a040a0" : type === 'Flying' ? "#a990f1" : type === 'Water' ? "#6891f1" : type === 'Bug' ? "#a8b921" : type === 'Normal' ? "#a8a979" : type === 'Electric' ? "#f9d031" : type === 'Ground' ? "#e0c169" : type === 'Fairy' ? "#ee98ad" : type === 'Fighting' ? "#c03028" : type === 'Psychic' ? "#f95988" : type === 'Steel' ? "#b8b8d0" : type === 'Ice' ? "#99d8d9" : type === 'Rock' ? "#8c7e40" : type === 'Dark' ? "#705949" : type === 'Dragon' ? "#7139f8" : type === 'Ghost' ? "#705999" : '#68a090'
                        }}>{type}</p>
                      ))
                    }
                  </div>
                </section>
              ))}
            </div>
          </div >
      }
    </>
  )
}
