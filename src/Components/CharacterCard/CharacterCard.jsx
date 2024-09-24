export default CharacterCard;

import styles from "./CharacterCard.module.css";
import { capitalize } from "../../Utils";
import PropTypes from "prop-types";
import CharacterModel from "../../Models/CharacterModel";
import Tilt from "react-parallax-tilt";
import CardBackImg from "../../assets/card-back.png";

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
      //console.log("Wrong!");
      onLose();
      setScore(0);
    }
    //console.log(name);
  }

  return (
    <Tilt
      tiltReverse
      reset
      glareEnable={true}
      className={styles.CharacterCardContainer}
    >
      <div
        className={styles.CharacterCardInner}
        onClick={handleOnClick}
        style={{
          ...style,
          aspectRatio: "2.5/3.5",
          width: longerScreenWidth ? "18vh" : "24vw",
        }}
      >
        <div
          className={styles.CharacterCardFront}
          style={{
            padding: longerScreenWidth ? "1vh" : "1vw",
          }}
        >
          <div className={styles.CharacterCardImage}>
            <img
              src={imgUrl}
              alt={name + ".png"}
              style={{ width: "100%", height: "100%" }}
              draggable={false}
            />
          </div>
          <div
            className={styles.CharacterCardName}
            style={{ fontSize: longerScreenWidth ? "2vh" : "3vw" }}
          >
            <div style={{ textAlign: "center" }}>{capitalize(name)}</div>
          </div>
        </div>
        <div className={styles.CharacterCardBack}>
          <img src={CardBackImg} style={{ width: "109%" }} alt="" />
        </div>
      </div>
    </Tilt>
  );
}
CharacterCard.propTypes = {
  pokemonData: PropTypes.instanceOf(CharacterModel).isRequired,
  style: PropTypes.object,
  setScore: PropTypes.func,
  onSafeClick: PropTypes.func,
  onLose: PropTypes.func,
};
