export default CharacterCard;

import styles from "./CharacterCard.module.css";
import { capitalize } from "../../Utils";
import PropTypes from "prop-types";
import CharacterModel from "../../Models/CharacterModel";
import Tilt from "react-parallax-tilt";
import CardBackImg from "../../assets/card-back.png";
import { useEffect, useState } from "react";

function CharacterCard({
  pokemonData,
  style = {},
  setScore = () => {},
  onSafeClick = () => {},
  onLose = () => {},
}) {
  const [interactable, setInteractable] = useState(false);
  const name = pokemonData.name;
  const imgUrl = pokemonData.spriteUrl;
  const ANIMATION_TIME = 1000;

  useEffect(() => {
    setTimeout(() => setInteractable(true), ANIMATION_TIME);
  }, []);

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
          width: longerScreenWidth ? "20vh" : "22vw",
          pointerEvents: interactable ? "auto" : "none",
        }}
      >
        <div
          className={styles.CharacterCardFront}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className={styles.CharacterCardImage}
            style={{ marginTop: longerScreenWidth ? "1vh" : "1vw" }}
          >
            <img src={imgUrl} alt={name + ".png"} draggable={false} />
          </div>
          <div
            className={styles.CharacterCardName}
            style={{ fontSize: longerScreenWidth ? "1.5vh" : "2vw" }}
          >
            <div style={{ textAlign: "center" }}>{capitalize(name)}</div>
          </div>
        </div>
        <div className={styles.CharacterCardBack}>
          <img src={CardBackImg} style={{ width: "100%" }} alt="" />
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
