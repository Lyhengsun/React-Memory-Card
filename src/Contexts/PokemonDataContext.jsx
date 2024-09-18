import { createContext } from "react";
import PropTypes from "prop-types";

export const PokemonDataContext = createContext(null);

export function PokemonDataProvider({ children, initialData = [] }) {
  return (
    <PokemonDataContext.Provider value={initialData}>
      {children}
    </PokemonDataContext.Provider>
  );
}
PokemonDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialData: PropTypes.array.isRequired,
};
