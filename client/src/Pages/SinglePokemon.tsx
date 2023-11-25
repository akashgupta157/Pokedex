import style from '../CSS/singlepokemon.module.scss';
import Loader from '../Components/Loader';
import { useParams } from 'react-router-dom';
export default function SinglePokemon() {
  const { id, name } = useParams();
  return (
    <></>
    // <>
    //   <div className={style.head}>
    //     <h1>{pokemon.name}</h1>
    //     <h2>#{pokemon.number}</h2>
    //   </div>
    //   <div className={style.body}>
    //     <img src={pokemon.image} alt="" />
    //     <div>
    //       <div>
    //         <div>
    //           <h3>Weight</h3>
    //           <p>{(parseFloat(pokemon.weight.maximum) + parseFloat(pokemon.weight.minimum) / 2).toFixed(2)} kg</p>
    //         </div>
    //         <div>
    //           <h3>Category</h3>
    //           <p>{pokemon.classification.split(' ')[0]}</p>
    //         </div>
    //         <div>
    //           <h3>Height</h3>
    //           <p>{(parseFloat(pokemon.height.maximum) + parseFloat(pokemon.height.minimum) / 2).toFixed(2)} m</p>
    //         </div>
    //         <div>
    //           <h3>Flee Rate</h3>
    //           <p>{pokemon.fleeRate}</p>
    //         </div>
    //       </div>
    //       <div>
    //         <h2>Type</h2>
    //         <div>{
    //           pokemon.types.map((type: any, index: number) => (
    //             <p key={index} style={{
    //               backgroundColor: type === 'Grass' ? '#79c851' : type === 'Fire' ? "#f18031" : type === 'Poison' ? "#a040a0" : type === 'Flying' ? "#a990f1" : type === 'Water' ? "#6891f1" : type === 'Bug' ? "#a8b921" : type === 'Normal' ? "#a8a979" : type === 'Electric' ? "#f9d031" : type === 'Ground' ? "#e0c169" : type === 'Fairy' ? "#ee98ad" : type === 'Fighting' ? "#c03028" : type === 'Psychic' ? "#f95988" : type === 'Steel' ? "#b8b8d0" : type === 'Ice' ? "#99d8d9" : type === 'Rock' ? "#8c7e40" : type === 'Dark' ? "#705949" : type === 'Dragon' ? "#7139f8" : type === 'Ghost' ? "#705999" : '#68a090'
    //             }}>{type}</p>
    //           ))
    //         }
    //         </div>
    //       </div>
    //       <div>
    //         <h2>Weaknesses</h2>
    //         <div>{
    //           pokemon.weaknesses.map((type: any, index: number) => (
    //             <p key={index} style={{
    //               backgroundColor: type === 'Grass' ? '#79c851' : type === 'Fire' ? "#f18031" : type === 'Poison' ? "#a040a0" : type === 'Flying' ? "#a990f1" : type === 'Water' ? "#6891f1" : type === 'Bug' ? "#a8b921" : type === 'Normal' ? "#a8a979" : type === 'Electric' ? "#f9d031" : type === 'Ground' ? "#e0c169" : type === 'Fairy' ? "#ee98ad" : type === 'Fighting' ? "#c03028" : type === 'Psychic' ? "#f95988" : type === 'Steel' ? "#b8b8d0" : type === 'Ice' ? "#99d8d9" : type === 'Rock' ? "#8c7e40" : type === 'Dark' ? "#705949" : type === 'Dragon' ? "#7139f8" : type === 'Ghost' ? "#705999" : '#68a090'
    //             }}>{type}</p>
    //           ))
    //         }
    //         </div>
    //       </div>
    //       <div>
    //         <h2>Resistant</h2>
    //         <div>{
    //           pokemon.resistant.map((type: any, index: number) => (
    //             <p key={index} style={{
    //               backgroundColor: type === 'Grass' ? '#79c851' : type === 'Fire' ? "#f18031" : type === 'Poison' ? "#a040a0" : type === 'Flying' ? "#a990f1" : type === 'Water' ? "#6891f1" : type === 'Bug' ? "#a8b921" : type === 'Normal' ? "#a8a979" : type === 'Electric' ? "#f9d031" : type === 'Ground' ? "#e0c169" : type === 'Fairy' ? "#ee98ad" : type === 'Fighting' ? "#c03028" : type === 'Psychic' ? "#f95988" : type === 'Steel' ? "#b8b8d0" : type === 'Ice' ? "#99d8d9" : type === 'Rock' ? "#8c7e40" : type === 'Dark' ? "#705949" : type === 'Dragon' ? "#7139f8" : type === 'Ghost' ? "#705999" : '#68a090'
    //             }}>{type}</p>
    //           ))
    //         }
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {
    //     pokemon.evolutions &&
    //     <div className={style.bot}>
    //       <h2>Evolutions</h2>

    //     </div>
    //   }
    // </>
  );
}
