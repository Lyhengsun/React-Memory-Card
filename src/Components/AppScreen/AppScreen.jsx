import { useState } from "react";
import { usePokemonData } from "../../Contexts/ContextHook";
import { OnePokemonProvider } from "../../Contexts/OnePokemonContext";
import CharacterCard from "../CharacterCard/CharacterCard";

export default AppScreen;

function AppScreen() {
  const pokemonData = usePokemonData();
  const [selectedIds, setSelectedIds] = useState([1]);
  function getVisiblePokemon() {
    const pokemons = [];
    //const selectedIdsCopy = [...selectedIds];
    //const unSelectedIds = pokemonData.map((pokemon) => {
    //  if (!(pokemon.id in selectedIds)) {
    //    return pokemon.id;
    //  }
    //});
    //const maxPokemon = 9;
    //const maxSelectedPokemon = selectedIds.length < 3 ? selectedIds.length : 3;
    //for (let index = 0; index < maxPokemon; index++) {
    //  if (index + 1 <= maxSelectedPokemon) {
    //    const randomIndex = Math.floor(Math.random() * selectedIdsCopy.length);
    //    pokemons.push(pokemonData[selectedIdsCopy[randomIndex]]);
    //    selectedIdsCopy.splice(randomIndex, 1);
    //  } else {
    //    pokemons.push(pokemonData[unSelectedIds[0] - 1]);
    //    unSelectedIds.splice(0, 1);
    //  }
    //}
    //console.log("unSelectedIds");
    //console.log(unSelectedIds);

    let testindex = 0;
    //for (let index = 0; index < 9; index++) {
    //  console.log(selectedIds.includes(pokemonData[index].id));
    //  console.log(pokemons.length);
    //  if (!selectedIds.includes(pokemonData[index].id)) {
    //    pokemons.push(pokemonData[index]);
    //  }
    //}
    while (pokemons.length < 9) {
      //console.log(!selectedIds.includes(pokemonData[testindex].id));
      if (!selectedIds.includes(pokemonData[testindex].id)) {
        pokemons.push(pokemonData[testindex]);
      }
      testindex++;
      //}
    }
    return pokemons;
  }

  const visiblePokemon = getVisiblePokemon();
  console.log("selectedIds");
  console.log(selectedIds);

  console.log("visiblePokemon");
  console.log(visiblePokemon);
  //console.log("rendering");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "10px",
      }}
    >
      {visiblePokemon.map((pokemon) => {
        return (
          <CharacterCard
            key={pokemon.id}
            pokemonData={pokemon}
            setSelectedIds={setSelectedIds}
          />
        );
      })}
    </div>
  );
}
