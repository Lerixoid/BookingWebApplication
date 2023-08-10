const Appointment = (props) => {
  function getTime(time) {
    var date = new Date(Date.parse(time));
    if (date.getMinutes() === 0) {
      return date.getHours() + ":" + date.getMinutes() + 0;
    }
    return date.getHours() + ":" + date.getMinutes();
  }

  function getDate(date) {
    const dateSplit = date.split("T")[0];

    const year = dateSplit.split("-")[0];
    const month = dateSplit.split("-")[1];
    const day = dateSplit.split("-")[2];

    return year + "/" + month + "/" + day;
  }

  let button;
  if (!props.isHistory) {
    button = (
      <button
        className="appointment__cancel"
        onClick={() => props.onCancelHandle(props.item)}
      >
        Cancel
      </button>
    );
  } else {
    button = (
      <button
        className="appointment__comment"
        onClick={() => props.onCommentHandle(props.item)}
      >
        Comment
      </button>
    );
  }

  return (
    <div className="appointment">
      <p className="appointment__title">{props.item.appointmentID}</p>
      <p className="appointment__title">{props.item.appointmentType.name}</p>
      <div className="appointment__time">
        <p>{getDate(props.item.dateFrom)}</p>
        <p>
          {getTime(props.item.dateFrom)}-{getTime(props.item.dateTo)}
        </p>
      </div>
      <p className="appointment__cost">{props.item.appointmentType.price}zl</p>

      {button}
    </div>
  );
};

export default Appointment;
