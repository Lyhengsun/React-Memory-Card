import { useEffect, useState } from "react";
import {
  usePokemonData,
  usePokemonSelectIds,
} from "../../Contexts/ContextHook";
import CharacterCard from "../CharacterCard/CharacterCard";
import { PokemonDataProvider } from "../../Contexts/PokemonDataContext";

export default AppScreen;

function AppScreen() {
  const pokemonData = usePokemonData();
  const selectedIds = usePokemonSelectIds();

  const [screenState, setScreenState] = useState("preloading");
  const [score, setScore] = useState(0);

  useEffect(() => {
    let ignore = false;
    setTimeout(() => {
      if (!ignore) {
        setScreenState("loaded");
        console.log("set screen state to loaded");
      }
    }, 1000);
    return () => {
      ignore = true;
    };
  }, []);

  function getVisiblePokemon() {
    const pokemons = [];
    const selectedIdsCopy = [...selectedIds];
    const unSelectedIds = pokemonData
      .filter((pokemon) => {
        if (!selectedIds.includes(pokemon.id)) {
          return true;
        }
      })
      .map((pokemon) => pokemon.id);

    let unselectedIndex = 0;
    const maxPokemon = 9;
    const maxSelectedPokemon = 3;
    while (pokemons.length < maxPokemon) {
      if (
        selectedIds.length >= pokemonData.length - 6 ||
        (pokemons.length < maxSelectedPokemon && selectedIdsCopy.length > 0)
      ) {
        const randomIndex = Math.floor(Math.random() * selectedIdsCopy.length);
        pokemons.push(pokemonData[selectedIdsCopy[randomIndex] - 1]);
        selectedIdsCopy.splice(randomIndex, 1);
      } else {
        const randomUnselectedIndex = Math.floor(
          Math.random() * unSelectedIds.length,
        );
        pokemons.push(pokemonData[unSelectedIds[randomUnselectedIndex] - 1]);
        unSelectedIds.splice(randomUnselectedIndex, 1);
      }
    }

    //shuffle the visible pokemon array
    const maxVisiblePokemon = 9;
    for (let index = 0; index < maxVisiblePokemon; index++) {
      const randomShuffledIndex = Math.floor(Math.random() * maxVisiblePokemon);
      const pokemon1 = pokemons[randomShuffledIndex];
      pokemons[randomShuffledIndex] = pokemons[index];
      pokemons[index] = pokemon1;
    }

    return pokemons;
  }

  const visiblePokemon = getVisiblePokemon();

  console.log();
  console.log("visiblePokemon");
  console.log(visiblePokemon);
  console.log("rendering");

  return (
    <div>
      {screenState === "preloading" ? (
        <div>Preloading Pokemons...</div>
      ) : (
        <div
          style={{ marginBottom: "10px", fontSize: "24px", fontWeight: "bold" }}
        >
          Score: {score}
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1vw",
        }}
      >
        {screenState === "preloading"
          ? pokemonData.map((pokemon) => (
              <CharacterCard
                key={pokemon.id}
                pokemonData={pokemon}
                setScore={setScore}
                style={{ display: "none" }}
              />
            ))
          : visiblePokemon.map((pokemon) => (
              <CharacterCard
                key={pokemon.id}
                pokemonData={pokemon}
                setScore={setScore}
              />
            ))}
      </div>
    </div>
  );
}
