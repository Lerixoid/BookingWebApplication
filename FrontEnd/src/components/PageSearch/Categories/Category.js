const Category = (props) => {
  return (
    <div className="category">
      <button>
        <ion-icon name={props.iconName} class="category__icon"></ion-icon>
      </button>
      <h5 className="category__title">{props.title}</h5>
    </div>
  );
};

export default Category;
