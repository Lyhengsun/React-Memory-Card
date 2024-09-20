import PropTypes from "prop-types";
import { PokemonDataContext } from "./ContextHook";

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
