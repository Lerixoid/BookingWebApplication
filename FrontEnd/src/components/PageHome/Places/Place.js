import { useNavigate } from "react-router-dom";

const Place = (props) => {
  const navigate = useNavigate();

  const toServices = () => {
    navigate("/services", {
      state: { city: props.name },
    });
  };

  return (
    <a
      onClick={() => {
        toServices();
      }}
    >
      <div className="place">
        <img className="place__img" alt="City" src={props.source}></img>

        <div className="place__title-container">
          <p className="place__title">{props.name}</p>
        </div>
      </div>
    </a>
  );
};

export default Place;
