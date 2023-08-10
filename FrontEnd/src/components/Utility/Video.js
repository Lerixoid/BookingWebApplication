const Video = (props) => {
  return (
    <video className="hero-video__content" muted autoPlay loop>
      <source src={props.src} />
    </video>
  );
};

export default Video;
