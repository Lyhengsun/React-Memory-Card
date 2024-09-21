import { useEffect } from "react";
import "./App.css";
import AppScreen from "./Components/AppScreen/AppScreen";

function App() {
  //change website title
  useEffect(() => {
    document.title = "PokeMemory Game";
  }, []);

  return <AppScreen />;
}

export default App;
