import style from "../../sass/components/service.module.scss";
import Facility from "./Facility";
import React, { useState } from "react";
import Modal from "./Modal";

const Facilities = (props) => {
  const [clickedFacility, setClickedFacility] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const requestFacility = (request) => {
    setClickedFacility(request);
    setOpenModal(true);
  };

  return (
    <>
      <div className={`${style.facility} margin-bottom-big`}>
        <h3 className={style.facilities__title}>List of services</h3>
        <div className={style.facilities__container}>
          {props.item.appointmentTypes.map((facility) => {
            return (
              <Facility
                key={facility.appointmentTypeID}
                facility={facility}
                request={requestFacility}
              />
            );
          })}
        </div>

        <Modal
          services={props.item.appointmentTypes}
          salon={props.item}
          initialService={clickedFacility}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setOpenServices(false);
          }}
          openServices={openServices}
          setOpenServices={setOpenServices}
        />
      </div>
    </>
  );
};

export default Facilities;
