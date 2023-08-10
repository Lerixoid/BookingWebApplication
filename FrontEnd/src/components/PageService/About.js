import style from "../../sass/components/service.module.scss";
import Amentity from "./Amentity";

const About = (props) => {
  
  return (
    <div className={style.about}>
      <div className={style.description}>
        <h3 className={style.description__title}>About Us</h3>
        <p className={style.description__text}>{props.item.description}</p>
      </div>
      <div className={style.bonuses}>
        <h3 className={style.bonuses__title}>Bonuses</h3>
        <div className={style.bonuses__container}>
          {props.item.amentities.map((amentity) => {
            return <Amentity amentity={amentity} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
