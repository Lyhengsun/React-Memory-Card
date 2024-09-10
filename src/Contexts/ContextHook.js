import { useContext } from "react";
import {
  PokemonDataContext,
  PokemonDataDispatchContext,
} from "./PokemonDataContext";
import { OnePokemonContext } from "./OnePokemonContext";

export function usePokemonData() {
  return useContext(PokemonDataContext);
}

export function usePokemonDataDispatch() {
  return useContext(PokemonDataDispatchContext);
}

export function useOnePokemon() {
  return useContext(OnePokemonContext);
}
