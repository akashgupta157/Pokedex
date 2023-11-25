import { useNavigate } from 'react-router-dom';
import style from '../CSS/home.module.scss'
import Loader from '../Components/Loader'
export default function Home() {
  const navigate = useNavigate()
  return (
    <></>
    // <div style={{ backgroundColor: '#f0f0f0' }}>
    //   <div className={style.grid}>
    //     {data.pokemons.map((pokemon: any) => (
    //       <section key={pokemon.id} onClick={() => navigate(`/${pokemon.name}/${pokemon.id}`)}>
    //         <img src={pokemon.image} alt={pokemon.name} />
    //         <p>#{pokemon.number}</p>
    //         <h1>{pokemon.name}</h1>
    //         <div>
    //           {
    //             pokemon.types.map((type: any, index: number) => (
    //               <p key={index} style={{
    //                 backgroundColor: type === 'Grass' ? '#79c851' : type === 'Fire' ? "#f18031" : type === 'Poison' ? "#a040a0" : type === 'Flying' ? "#a990f1" : type === 'Water' ? "#6891f1" : type === 'Bug' ? "#a8b921" : type === 'Normal' ? "#a8a979" : type === 'Electric' ? "#f9d031" : type === 'Ground' ? "#e0c169" : type === 'Fairy' ? "#ee98ad" : type === 'Fighting' ? "#c03028" : type === 'Psychic' ? "#f95988" : type === 'Steel' ? "#b8b8d0" : type === 'Ice' ? "#99d8d9" : type === 'Rock' ? "#8c7e40" : type === 'Dark' ? "#705949" : type === 'Dragon' ? "#7139f8" : type === 'Ghost' ? "#705999" : '#68a090'
    //               }}>{type}</p>
    //             ))
    //           }
    //         </div>
    //       </section>
    //     ))}
    //   </div>
    // </div >
  )
}
