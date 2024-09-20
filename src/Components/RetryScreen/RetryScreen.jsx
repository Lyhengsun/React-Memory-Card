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
      <div
        style={{ fontWeight: "bold", fontSize: "3em", marginBottom: "10px" }}
      >
        You Fail!
      </div>
      <button
        onClick={handleOnClickRetryBtn}
        style={{
          border: "none",
          padding: "12px 24px",
          borderRadius: "15px",
          backgroundColor: "lime",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.5em",
          marginBottom: "20px",
        }}
      >
        Retry
      </button>{" "}
      <br />
      <button
        onClick={handleOnClickMenuBtn}
        style={{
          border: "none",
          padding: "12px 24px",
          borderRadius: "15px",
          backgroundColor: "lime",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.5em",
        }}
      >
        Back to menu
      </button>
    </div>
  );
}
RetryScreen.propTypes = {
  setAppState: PropTypes.func,
};
