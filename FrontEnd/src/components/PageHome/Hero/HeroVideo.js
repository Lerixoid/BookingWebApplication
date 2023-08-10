import Video from "../../Utility/Video";

const HeroVideo = () => {
  return (
    <div className="hero-video">
      <Video src={`${process.env.PUBLIC_URL}/hero.mp4`} />
      <h2 className="hero-video__title">Book everything you want</h2>
    </div>
  );
};

export default HeroVideo;
