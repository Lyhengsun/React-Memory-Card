import { usePokemonData } from "../../Contexts/ContextHook";
import { OnePokemonProvider } from "../../Contexts/OnePokemonContext";
import CharacterCard from "../CharacterCard/CharacterCard";

export default AppScreen;

function AppScreen() {
  const pokemonData = usePokemonData();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "5px",
      }}
    >
      {pokemonData.map((pokemon) => (
        <CharacterCard key={pokemon.id} pokemonData={pokemon} />
      ))}
    </div>
  );
}
