import { RefObject, useEffect, useState } from "react";
import PropTypes from "prop-types";

// ref : RefObject<HTMLElement>
export const useOnLoadImages = (ref) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    // images : HtmlImageElement
    const updateStatus = (images) => {
      setStatus(
        images.map((image) => image.complete).every((item) => item === true),
      );
    };

    if (!ref?.current) return;

    const imagesLoaded = Array.from(ref.current.querySelectorAll("img"));

    if (imagesLoaded.length === 0) {
      setStatus(true);
      return;
    }

    imagesLoaded.forEach((image) => {
      image.addEventListener("load", () => updateStatus(imagesLoaded), {
        once: true,
      });
      image.addEventListener("error", () => updateStatus(imagesLoaded), {
        once: true,
      });
    });
  }, [ref]);

  return status;
};
useOnLoadImages.propTypes = {
  ref: PropTypes.instanceOf(RefObject).isRequired,
};
