import { createContext, useContext, useReducer } from "react";
import PropTypes, { object } from "prop-types";
import CharacterModel from "../Models/CharacterModel";

export const PokemonDataContext = createContext(null);
export const PokemonDataDispatchContext = createContext(null);

export function PokemonDataProvider({ children, initialData = [] }) {
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

    case "edited_pokemon_data":
      return pokemonData.map((pokemon) => {
        if (pokemon.id === action.pokemonId) {
          return new CharacterModel(
            pokemon.id,
            action.pokemonName ? action.pokemonName : pokemon.name,
            action.pokemonSpriteUrl
              ? action.pokemonSpriteUrl
              : pokemon.spriteUrl,
            action.pokemonSelected ? action.pokemonSelected : false,
          );
        }
        return pokemon;
      });

    default:
      break;
  }
}
