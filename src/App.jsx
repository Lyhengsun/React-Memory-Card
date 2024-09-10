import { useEffect, useRef, useState } from "react";
import "./App.css";
import AppScreen from "./Components/AppScreen/AppScreen";
import { fetchData } from "./api/api";
import { PokemonDataProvider } from "./Contexts/PokemonDataContext";

function App() {
  const apiUrl = "https://pokeapi.co/api/v2/generation/1/";
  const [data, setData] = useState(null);
  const ignoreFetch = useRef(false);

  useEffect(() => {
    if (!ignoreFetch.current) {
      fetchData(apiUrl, setData);
    }

    return () => {
      ignoreFetch.current = true;
    };
  }, []);
  return (
    <>
      {data && (
        <PokemonDataProvider initialData={data.pokemon_species}>
          <AppScreen />
        </PokemonDataProvider>
      )}
    </>
  );
}

export default App;
