import { usePokemonData } from "../../Contexts/ContextHook";
import CharacterCard from "../CharacterCard/CharacterCard";

export default AppScreen;

function AppScreen() {
  const pokemonData = usePokemonData();
  console.log(pokemonData);

  return (
    <div>
      <CharacterCard />
    </div>
  );
}
