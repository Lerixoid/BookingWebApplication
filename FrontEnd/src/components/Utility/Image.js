import React from "react";

import { useState } from "react";

const Image = ({ data, ...props }) => {
  const [defaultPicture, setDefaultPicture] = useState("");

  if (data === null) {
    data = defaultPicture;
  }
  return (
    <>
      {data !== null && data !== undefined ? (
        <img {...props} src={`data:image/jpeg;base64,${data}`} />
      ) : (
        <p> </p>
      )}
    </>
  );
};
export default Image;
