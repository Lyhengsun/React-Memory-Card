import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPokemonByGeneration } from "../../api/api";
import { PokemonDataProvider } from "../../Contexts/PokemonDataContext";
import PlayScreen from "../PlayScreen/PlayScreen";

export default AppScreen;

function AppScreen() {
  const [data, setData] = useState(null);
  const [state, setState] = useState("playscreen");
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

  const screen = useMemo(() => {
    switch (state) {
      case "playscreen":
        return (
          <PokemonDataProvider initialData={data}>
            <PlayScreen />
          </PokemonDataProvider>
        );

      default:
        break;
    }
  }, [state, data]);

  return <>{data ? screen : <div>Loading...</div>}</>;
}
