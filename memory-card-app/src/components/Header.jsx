/* eslint-disable react/prop-types */
const Header = ({ currentScore, highScore }) => {
    return (
      <div className="header">
        <h3>Memory-card</h3>
        <div className="scoreboard">
          <h3 className="current-score"> current-score : {currentScore}</h3>
          <h3 className="Highest-score"> High-score: {highScore} </h3>
        </div>
      </div>
    );
  };
export default Header