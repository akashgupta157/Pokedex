import style from '../CSS/singlepokemon.module.scss';
import { useQuery, gql } from '@apollo/client';
import Loader from '../Components/Loader';
import { useParams } from 'react-router-dom';
export default function SinglePokemon() {
    const { id, name } = useParams();
    const { loading, error, data } = useQuery(gql`
    query Pokemon($id: String, $name: String) {
      pokemon(id: $id, name: $name) {
        id
        number
        name
        weight {
          minimum
          maximum
        }
        height {
          minimum
          maximum
        }
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        maxHP
        image
        evolutions {
          id
          number
          name
          classification
          types
          resistant
          weaknesses
          fleeRate
          maxCP
          maxHP
          image
        }
        attacks{
            fast{
              name
              type
              damage
            }
            special{
              name
              type
              damage
            }
          }
      }
    }
  `, {
        variables: { id, name },
    });
    if (loading) return <Loader />;
    if (error) return <p>Error: {error.message}</p>;
    const { pokemon } = data;
    console.log(pokemon)
    return (
        <>
            <div className={style.head}>
                <h1>{pokemon.name}</h1>
                <h2>#{pokemon.number}</h2>
            </div>
            <div className={style.body}>
                <img src={pokemon.image} alt="" />
                <div>
                    
                </div>
            </div>
        </>
    );
}
