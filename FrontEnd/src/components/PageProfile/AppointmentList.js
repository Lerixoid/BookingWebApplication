import { useState } from "react";

import Appointment from "./Appointment";
import globalUrls from "../Utility/Urls";
import { useEffect } from "react";

const AppointmentList = (props) => {
  const [appointments, setAppointments] = useState(props.appointments);

  const cancelAppointmentHandle = (appointment) => {
    const id = appointment.appointmentID;

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    };

    const fetchPost = async () => {
      const response = await fetch(
        globalUrls.BASE_URL + "/api/Appointments/" + id,
        requestOptions
      );

      if (response.ok) {
        return response;
      } else {
        throw new Error("Data coud not be fetched!");
      }
    };

    const requestOptionsGet = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };

    const fetchGetAppointments = async () => {
      const response = await fetch(
        globalUrls.BASE_URL + "/api/Accounts/" + props.userId + "/appointments",
        requestOptionsGet
      );

      const data = await response.json();

      if (response.ok) {
        setAppointments(data);
      } else {
        throw new Error("Data coud not be fetched!");
      }
    };

    fetchPost().then((res) => {
      fetchGetAppointments();
    });
  };

  return (
    <div className="appointments">
      {appointments.map((appointment) => (
        <Appointment
          key={appointment.appointmentID}
          item={appointment}
          onCancelHandle={() => cancelAppointmentHandle(appointment)}
          isHistory={props.isHistory}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
