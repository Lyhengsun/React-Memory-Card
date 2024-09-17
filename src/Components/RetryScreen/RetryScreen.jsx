import PropTypes from "prop-types";

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
      <div>RetryScreen</div>
      <button onClick={handleOnClickRetryBtn}>Retry</button> <br />
      <button onClick={handleOnClickMenuBtn}>Back to menu</button>
    </div>
  );
}
RetryScreen.propTypes = {
  setAppState: PropTypes.func,
};
