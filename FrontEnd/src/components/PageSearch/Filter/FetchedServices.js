import React from "react";
import Service from "./Service";

const FetchedServices = (props) => {
  return (
    <>
      {props.salons.length !== 0 ? (
        props.salons.map((salon) => {
          return <Service service={salon} />;
        })
      ) : (
        <></>
      )}
    </>
  );
};
export default FetchedServices;
