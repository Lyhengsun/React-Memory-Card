import { useContext } from "react";
import { PokemonDataContext } from "./PokemonDataContext";

export function usePokemonData() {
  return useContext(PokemonDataContext);
}
