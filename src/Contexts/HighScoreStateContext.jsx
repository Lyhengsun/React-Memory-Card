import { useState } from "react";
import PropTypes from "prop-types";
import { highScoreStateContext } from "./ContextHook";

export function HighScoreStateProvider({ children }) {
  const [highScore, setHighScore] = useState(0);

  function setScore(score) {
    if (score > highScore) {
      setHighScore(score);
    }
  }

  return (
    <highScoreStateContext.Provider value={[highScore, setScore]}>
      {children}
    </highScoreStateContext.Provider>
  );
}
HighScoreStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
