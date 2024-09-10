const fetchData = (
  url,
  setData,
  signal = null,
  options = { logging: false },
) => {
  fetch(url, { signal: signal ? signal : null })
    .then((response) => response.json())
    .then((data) => {
      if (options.logging) {
        console.log("fetching data");
      }
      setData(data);
    })
    .catch((error) => {
      console.log("fetchData error");
      console.error(error);
      return null;
    });
};

export { fetchData };
