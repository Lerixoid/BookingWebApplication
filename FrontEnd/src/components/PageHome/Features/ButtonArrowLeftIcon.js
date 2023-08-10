const ButtonArrowLeftIcon = (props) => {
  return (
    <button
      type="button"
      className="features__button features__button--left"
      onClick={props.onClickIcon}
    >
      <ion-icon name="chevron-back-outline"></ion-icon>
    </button>
  );
};

export default ButtonArrowLeftIcon;
