import HeroVideo from "./HeroVideo";
import HeroSearch from "./HeroSearch";

const Hero = () => {
  return (
    <section className="hero margin-bottom-big">
      <div className="hero-container">
        <HeroVideo />
        <HeroSearch />
      </div>
    </section>
  );
};

export default Hero;
