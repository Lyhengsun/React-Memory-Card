import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPokemonByGeneration } from "../../api/api";
import { PokemonDataProvider } from "../../Contexts/PokemonDataContext";
import PlayScreen from "../PlayScreen/PlayScreen";
import MenuScreen from "../MenuScreen/MenuScreen";

export default AppScreen;

let ignoreSetData = [false];
function AppScreen() {
  const [data, setData] = useState([]);
  const [state, setState] = useState("menuscreen");
  const [includedGen, setIncludedGen] = useState([7, 3]);
  // state = ["playscreen", "menuscreen"]
  const ignoreFetch = useRef(false);

  useEffect(() => {
    if (!ignoreFetch.current) {
      includedGen.forEach((genId) => {
        fetchPokemonByGeneration((data) => setData((d) => [...d, ...data]), {
          logging: true,
          generationId: genId,
        });
      });
    }
    return () => {
      ignoreFetch.current = true;
    };
  }, [includedGen]);

  console.log(data);

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
      {data.length ? (
        <PokemonDataProvider initialData={data}>{screen}</PokemonDataProvider>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
