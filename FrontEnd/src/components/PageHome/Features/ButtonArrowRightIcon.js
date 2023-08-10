const ButtonArrowRightIcon = (props) => {
  return (
    <button
      className="features__button features__button--right"
      onClick={props.onClickIcon}
    >
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </button>
  );
};

export default ButtonArrowRightIcon;
