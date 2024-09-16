import { useEffect, useState } from "react";
import {
  usePokemonData,
  usePokemonSelectIds,
} from "../../Contexts/ContextHook";
import CharacterCard from "../CharacterCard/CharacterCard";
import PropTypes from "prop-types";

export default PlayScreen;

function PlayScreen({ setAppState = () => {} }) {
  const pokemonData = usePokemonData();
  const selectedIds = usePokemonSelectIds();

  const [screenState, setScreenState] = useState("preloading");
  const [score, setScore] = useState(0);
  const visiblePokemon = getVisiblePokemon();
  const longerScreenWidth = window.innerWidth >= window.innerHeight;

  useEffect(() => {
    let ignore = false;
    setTimeout(() => {
      if (!ignore) {
        setScreenState("loaded");
        //console.log("set screen state to loaded");
      }
    }, 3000);
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

    const maxPokemon = 9;
    const maxSelectedPokemon = 3;
    while (pokemons.length < maxPokemon) {
      if (
        selectedIds.length >= pokemonData.length - 6 ||
        (pokemons.length < maxSelectedPokemon && selectedIdsCopy.length > 0)
      ) {
        const randomIndex = Math.floor(Math.random() * selectedIdsCopy.length);
        const pokemon = pokemonData.filter(
          (p) => p.id === selectedIdsCopy[randomIndex],
        )[0];
        pokemons.push(pokemon);
        selectedIdsCopy.splice(randomIndex, 1);
      } else {
        const randomUnselectedIndex = Math.floor(
          Math.random() * unSelectedIds.length,
        );
        const pokemon = pokemonData.filter(
          (p) => p.id === unSelectedIds[randomUnselectedIndex],
        )[0];
        pokemons.push(pokemon);
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

  //console.log();
  //console.log("visiblePokemon");
  //console.log(visiblePokemon);
  //console.log("rendering");

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
          gap: longerScreenWidth ? "1vh" : "1vw",
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
PlayScreen.propTypes = {
  setAppState: PropTypes.func,
};
