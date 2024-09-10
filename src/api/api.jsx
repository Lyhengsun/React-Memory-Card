import { useEffect, useRef, useState } from "react";

const fetchData = (url, setData, signal = null) => {
  fetch(url, { signal: signal ? signal : null })
    .then((response) => response.json())
    .then((data) => {
      //console.log("fetching data");
      setData(data);
    })
    .catch((error) => {
      console.log("fetchData error");
      console.error(error);
      return null;
    });
};

export { fetchData };
