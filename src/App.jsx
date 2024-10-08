import { useEffect } from "react";
import "./App.css";
import AppScreen from "./Components/AppScreen/AppScreen";

function App() {
  //change website title
  useEffect(() => {
    document.title = "PokeMemory Game";
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppScreen />
    </div>
  );
}

export default App;
