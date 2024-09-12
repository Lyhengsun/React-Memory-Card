import { useEffect, useRef, useState } from "react";
import "./App.css";
import AppScreen from "./Components/AppScreen/AppScreen";
import { fetchData, fetchPokemonByGeneration } from "./api/api";
import { PokemonDataProvider } from "./Contexts/PokemonDataContext";

function App() {
  const [data, setData] = useState(null);
  const ignoreFetch = useRef(false);

  useEffect(() => {
    if (!ignoreFetch.current) {
      fetchPokemonByGeneration(setData, { logging: true });
    }

    return () => {
      ignoreFetch.current = true;
    };
  }, []);

  //console.log(data);
  return (
    <>
      {data && (
        <PokemonDataProvider initialData={data}>
          <AppScreen />
        </PokemonDataProvider>
      )}
    </>
  );
}

export default App;
