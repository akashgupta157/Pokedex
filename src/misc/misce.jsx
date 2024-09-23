import normal from "../assets/normal.svg";
import fire from "../assets/fire.svg";
import water from "../assets/water.svg";
import grass from "../assets/grass.svg";
import electric from "../assets/electric.svg";
import ice from "../assets/ice.svg";
import fighting from "../assets/fighting.svg";
import poison from "../assets/poison.svg";
import ground from "../assets/ground.svg";
import flying from "../assets/flying.svg";
import psychic from "../assets/psychic.svg";
import bug from "../assets/bug.svg";
import rock from "../assets/rock.svg";
import ghost from "../assets/ghost.svg";
import dragon from "../assets/dragon.svg";
import dark from "../assets/dark.svg";
import steel from "../assets/steel.svg";
import fairy from "../assets/fairy.svg";
export const typeSymbols = (type) => {
  switch (type) {
    case "fire":
      return fire;
    case "water":
      return water;
    case "grass":
      return grass;
    case "electric":
      return electric;
    case "ice":
      return ice;
    case "fighting":
      return fighting;
    case "poison":
      return poison;
    case "ground":
      return ground;
    case "flying":
      return flying;
    case "psychic":
      return psychic;
    case "bug":
      return bug;
    case "rock":
      return rock;
    case "ghost":
      return ghost;
    case "dragon":
      return dragon;
    case "dark":
      return dark;
    case "steel":
      return steel;
    case "fairy":
      return fairy;
    default:
      return normal;
  }
};
