/* eslint-disable react/prop-types */
const Character = ({ url, name, id, shuffleCharacters, playGame }) => {
    return (
      <div
        id={id}
        className="character"
        onClick={() => {
          shuffleCharacters();
          playGame(id);
        }}
      >
        <img src={url} alt="" />
        <p>{name}</p>
      </div>
    );
  };

  export default Character