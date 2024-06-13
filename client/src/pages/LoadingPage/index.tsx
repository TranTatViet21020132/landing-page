import "./Loading.css";

const Loading: React.FC = () => {
  return (
    <div id="loading-container">
      <div className="gooey">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
