export default CharacterCard;

import styles from "./CharacterCard.module.css";
import { capitalize } from "../../Utils";
import PropTypes from "prop-types";
import CharacterModel from "../../Models/CharacterModel";

function CharacterCard({
  pokemonData,
  style = {},
  setScore = () => {},
  onSafeClick = () => {},
  onLose = () => {},
}) {
  const name = pokemonData.name;
  const imgUrl = pokemonData.spriteUrl;

  const longerScreenWidth = window.innerWidth >= window.innerHeight;

  function handleOnClick() {
    if (!pokemonData.selected) {
      onSafeClick(pokemonData.id);
      setScore((n) => n + 1);
    } else {
      console.log("Wrong!");
      onLose();
      setScore(0);
    }
    //console.log(name);
  }

  return (
    <div
      className={styles.CharacterCardContainer}
      onClick={handleOnClick}
      style={{ ...style, padding: longerScreenWidth ? "1vh" : "1vw" }}
    >
      <div
        className={styles.CharacterCardImage}
        style={{ width: longerScreenWidth ? "18vh" : "27vw" }}
      >
        <img
          src={imgUrl}
          alt={name + ".png"}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div
        className={styles.CharacterCardName}
        style={{ fontSize: longerScreenWidth ? "2vh" : "3vw" }}
      >
        {capitalize(name)}
      </div>
    </div>
  );
}
CharacterCard.propTypes = {
  pokemonData: PropTypes.instanceOf(CharacterModel).isRequired,
  style: PropTypes.object,
  setScore: PropTypes.func,
  onSafeClick: PropTypes.func,
  onLose: PropTypes.func,
};
