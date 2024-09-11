import { createContext, useContext, useReducer } from "react";
import PropTypes, { object } from "prop-types";

export const PokemonDataContext = createContext(null);
export const PokemonDataDispatchContext = createContext(null);

export function PokemonDataProvider({ children , initialData = [] }) {
  const [pokemonData, dispatch] = useReducer(pokemonDataReducer, initialData);
  return (
    <PokemonDataContext.Provider value={pokemonData}>
      <PokemonDataDispatchContext.Provider value={dispatch}>
        {children}
      </PokemonDataDispatchContext.Provider>
    </PokemonDataContext.Provider>
  );
}
PokemonDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialData: PropTypes.array.isRequired,
};

function pokemonDataReducer(pokemonData, action) {
  switch (action.type) {
    case "added_new_generation":
      return pokemonData;

    default:
      break;
  }
}
