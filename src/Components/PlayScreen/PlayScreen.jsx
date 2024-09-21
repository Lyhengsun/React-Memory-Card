import { useRef, useState } from "react";
import { useHighScoreState, usePokemonData } from "../../Contexts/ContextHook";
import CharacterCard from "../CharacterCard/CharacterCard";
import PropTypes from "prop-types";
import { useOnLoadImages } from "../../CustomHooks/useOnLoadImages";
import CharacterModel from "../../Models/CharacterModel";

export default PlayScreen;

function getPokemonData(data, includedGen) {
  const pokemonDataArray = [];
  data
    .filter((obj) => includedGen.includes(obj.gen))
    .forEach((element) => {
      element.pokemons.forEach((element) => {
        pokemonDataArray.push(element);
      });
    });
  return pokemonDataArray;
}

function getVisiblePokemon(pokemonData, selectedIds) {
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
      unSelectedIds.length <= 0 ||
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

function PlayScreen({ setAppState = () => {}, includedGen = [] }) {
  const data = usePokemonData();
  const [pokemonData, setPokemonData] = useState(
    getPokemonData(data, includedGen),
  );
  const [score, setScore] = useState(0);

  const [highScore, setHighScore] = useHighScoreState();

  const selectedIds = pokemonData
    .filter((pokemon) => pokemon.selected)
    .map((p) => {
      return p.id;
    });
  const visiblePokemon = getVisiblePokemon(pokemonData, selectedIds);
  const longerScreenWidth = window.innerWidth >= window.innerHeight;

  const wrapperRef = useRef(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);

  function handleOnSafeClick(pokemonId) {
    setPokemonData(
      pokemonData.map((pokemon) =>
        pokemon.id === pokemonId
          ? new CharacterModel(pokemonId, pokemon.name, pokemon.spriteUrl, true)
          : pokemon,
      ),
    );
  }

  function handleOnLose() {
    setHighScore(score);
    setAppState("retryscreen");
  }

  //console.log(pokemonData);

  //console.log();
  //console.log("visiblePokemon");
  //console.log(visiblePokemon);
  //console.log("rendering");

  return (
    <div>
      {!imagesLoaded ? (
        <div>Preloading Pokemons...</div>
      ) : (
        <div
          style={{
            marginBottom: "10px",
            fontSize: "24px",
            fontWeight: "bold",
            width: "100vw",
            position: "absolute",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginLeft: "10px" }}>
            Max Score: {pokemonData.length}
          </div>
          <div>Score: {score}</div>
          <div style={{ marginRight: "10px" }}>Highscore: {highScore}</div>
        </div>
      )}
      <div
        ref={wrapperRef}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: longerScreenWidth ? "1vh" : "1vw",
        }}
      >
        {!imagesLoaded
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
                onSafeClick={handleOnSafeClick}
                onLose={handleOnLose}
              />
            ))}
      </div>
    </div>
  );
}
PlayScreen.propTypes = {
  setAppState: PropTypes.func,
  includedGen: PropTypes.array.isRequired,
};
