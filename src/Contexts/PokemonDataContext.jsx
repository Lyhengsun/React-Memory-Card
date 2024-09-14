import { createContext, useContext, useReducer, useState } from "react";
import PropTypes, { object } from "prop-types";
import CharacterModel from "../Models/CharacterModel";

export const PokemonDataContext = createContext(null);
export const PokemonDataDispatchContext = createContext(null);
export const PokemonSelectIdsContext = createContext(null);

export function PokemonDataProvider({ children, initialData = [] }) {
  const [pokemonData, dispatch] = useReducer(pokemonDataReducer, initialData);
  const [pokemonSelectIds, setPokemonSelectIds] = useState([]);

  function handleOnDispatch(action) {
    if (action.pokemonId && action.pokemonSelected) {
      setPokemonSelectIds([...pokemonSelectIds, action.pokemonId]);
    } else if (action.type === "reseted_pokemon_data_selection") {
      setPokemonSelectIds([]);
    }
    dispatch(action);
  }

  return (
    <PokemonDataContext.Provider value={pokemonData}>
      <PokemonDataDispatchContext.Provider value={handleOnDispatch}>
        <PokemonSelectIdsContext.Provider value={pokemonSelectIds}>
          {children}
        </PokemonSelectIdsContext.Provider>
      </PokemonDataDispatchContext.Provider>
    </PokemonDataContext.Provider>
  );
}
PokemonDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialData: PropTypes.array.isRequired,
};

function pokemonDataReducer(pokemonData, action) {
  const actionPokemonId = action.pokemonId ? action.pokemonId : null;
  switch (action.type) {
    case "added_new_generation":
      return pokemonData;

    case "edited_pokemon_data":
      return pokemonData.map((pokemon) => {
        if (pokemon.id === actionPokemonId) {
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

    case "reseted_pokemon_data_selection":
      return pokemonData.map((pokemon) => {
        pokemon.selected = false;
        //return new CharacterModel(pokemon.id, pokemon.name, pokemon.spriteUrl);
        return pokemon;
      });

    default:
      break;
  }
}
