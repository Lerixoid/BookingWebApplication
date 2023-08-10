const Tab = (props) => {
  return (
    <div className="tab">
      <button>
        <ion-icon name={props.tab.iconName} class="tab__icon"></ion-icon>
      </button>
      <h5 className="tab__title">{props.tab.title}</h5>
    </div>
  );
};

export default Tab;
