import { createContext } from "react";
import PropTypes from "prop-types";
import CharacterModel from "../Models/CharacterModel";

export const OnePokemonContext = createContext(null);

export function OnePokemonProvider({ children, pokemonData }) {
  return (
    <OnePokemonContext.Provider value={pokemonData}>
      {children}
    </OnePokemonContext.Provider>
  );
}
OnePokemonProvider.propTypes = {
  children: PropTypes.node.isRequired,
  pokemonData: PropTypes.instanceOf(CharacterModel).isRequired,
};
