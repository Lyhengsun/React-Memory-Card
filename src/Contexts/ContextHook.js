import { createContext, useContext } from "react";

export const PokemonDataContext = createContext(null);
export function usePokemonData() {
  return useContext(PokemonDataContext);
}

export const highScoreStateContext = createContext(null);
export function useHighScoreState() {
  return useContext(highScoreStateContext);
}
