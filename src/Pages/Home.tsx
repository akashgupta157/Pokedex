import style from '../CSS/home.module.scss'
import Loader from '../Components/Loader'
import { useQuery, gql } from '@apollo/client';
const GET_POKEMON = gql`
  {
    pokemons(first: 500) {
      id
      name
      number
      image
      types
    }
  }
`;
export default function Home() {
  const { loading, error, data } = useQuery(GET_POKEMON);
  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ul>
        {data.pokemons.map((pokemon: any) => (
          <li key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name} />
            {pokemon.name}
            {pokemon.types}
          </li>
        ))}
      </ul>
    </div>
  )
}
