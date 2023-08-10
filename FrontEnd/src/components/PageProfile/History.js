import Appointment from "./Appointment";

const History = (props) => {
  const commentHandle = (appointment) => {};

  return (
    <div className="appointments">
      {props.appointments.map((appointment) => (
        <Appointment
          key={appointment.appointmentID}
          item={appointment}
          onCommentHandle={() => commentHandle(appointment)}
          isHistory={props.isHistory}
        />
      ))}
    </div>
  );
};

export default History;
