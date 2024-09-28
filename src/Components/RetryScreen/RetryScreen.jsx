import PropTypes from "prop-types";
import styles from "./RetryScreen.module.css";

export default RetryScreen;

function RetryScreen({ setAppState = () => {} }) {
  function handleOnClickRetryBtn() {
    setAppState("playscreen");
  }

  function handleOnClickMenuBtn() {
    setAppState("menuscreen");
  }

  return (
    <div>
      <div className={styles.Header}>You Fail!</div>
      <div className={styles.RetryMenu}>
        <button onClick={handleOnClickRetryBtn}>Retry</button> <br />
        <button onClick={handleOnClickMenuBtn}>Back to menu</button>
      </div>
    </div>
  );
}
RetryScreen.propTypes = {
  setAppState: PropTypes.func,
};
