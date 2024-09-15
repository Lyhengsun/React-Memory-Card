import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPokemonByGeneration } from "../../api/api";
import { PokemonDataProvider } from "../../Contexts/PokemonDataContext";
import PlayScreen from "../PlayScreen/PlayScreen";
import MenuScreen from "../MenuScreen/MenuScreen";

export default AppScreen;

function AppScreen() {
  const [data, setData] = useState(null);
  const [state, setState] = useState("menuscreen");
  // state = ["playscreen", "menuscreen"]
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
      case "menuscreen":
        return <MenuScreen setAppState={setState} />;
      case "playscreen":
        return <PlayScreen setAppState={setState} />;

      default:
        return <div>Error</div>;
    }
  }, [state]);

  return (
    <>
      {data ? (
        <PokemonDataProvider initialData={data}>{screen}</PokemonDataProvider>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
