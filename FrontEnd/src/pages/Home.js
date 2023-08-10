import Hero from "../components/PageHome/Hero/Hero";
import Features from "../components/PageHome/Features/Features";
import Places from "../components/PageHome/Places/Places";

import "../sass/components/hero.scss";
import "../sass/components/features.scss";
import "../sass/components/places.scss";

const Home = () => {
  return (
    <main className="main-home">
      <Hero />
      <Features />
      <Places />
    </main>
  );
};

export default Home;
