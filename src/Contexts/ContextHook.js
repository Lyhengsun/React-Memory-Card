import { useContext } from "react";
import {
  PokemonDataContext,
  PokemonDataDispatchContext,
  PokemonSelectIdsContext,
} from "./PokemonDataContext";

export function usePokemonData() {
  return useContext(PokemonDataContext);
}

export function usePokemonDataDispatch() {
  return useContext(PokemonDataDispatchContext);
}

export function usePokemonSelectIds() {
  return useContext(PokemonSelectIdsContext);
}
