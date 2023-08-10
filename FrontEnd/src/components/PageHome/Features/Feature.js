import { useNavigate } from "react-router-dom";

const Feature = (props) => {
  const navigate = useNavigate();

  const toServices = () => {
    navigate("/services", {
      state: { category: props.title },
    });
  };

  return (
    <div className="feature">
      <ion-icon name={props.iconName} class="feature__icon"></ion-icon>
      <h4 className="feature__title">{props.title}</h4>
      <p className="feature__description">{props.description}</p>
      <button
        onClick={() => {
          toServices();
        }}
        className="feature__button"
      >
        Book
      </button>
    </div>
  );
};

export default Feature;
