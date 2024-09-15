import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPokemonByGeneration } from "../../api/api";
import { PokemonDataProvider } from "../../Contexts/PokemonDataContext";
import PlayScreen from "../PlayScreen/PlayScreen";
import MenuScreen from "../MenuScreen/MenuScreen";

export default AppScreen;

let ignoreSetData = [false];
function AppScreen() {
  const [data, setData] = useState(null);
  const [state, setState] = useState("menuscreen");
  const [includedGen, setIncludedGen] = [1];
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
        return (
          <MenuScreen setAppState={setState} ignoreFetch={ignoreSetData} />
        );
      case "playscreen":
        return <PlayScreen setAppState={setState} />;

      default:
        return <div>Error</div>;
    }
  }, [state]);

  console.log(ignoreSetData);
  if (!ignoreSetData[0]) {
    console.log("rendering");
    ignoreSetData[0] = true;
  }

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
