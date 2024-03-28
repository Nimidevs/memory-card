/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./App.css";
import Character from "./components/character-card";
import Header from "./components/Header";

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCharacters, setClickedCharacters] = useState([]);

  const randomizeCharacters = () => {
    setCharacters((prevCharacters) => {
      return [...prevCharacters].sort(() => Math.random() - 0.5);
    });
  };

  const gamePlay = (id) => {
    if (clickedCharacters.includes(id)) {
      setClickedCharacters([]);
      setCurrentScore(0);
    } else {
      setClickedCharacters([...clickedCharacters, id]);
      setCurrentScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > highScore) {
          localStorage.setItem("highscore", newScore);
          setHighScore(newScore);
        }
        return newScore;
      });
    }
  };

  useEffect(() => {
    localStorage.getItem("highscore") === null
      ? setHighScore(0)
      : setHighScore(localStorage.getItem("highscore"));
  }, []);

  useEffect(() => {
    async function getCharacterData() {
      try {
        const character = await fetch(
          // "https://anfi.tk/greekApi/person/getAll ",
          "https://hp-api.onrender.com/api/characters",
          { mode: "cors" }
        );
        
        const result = await character.json();
        console.log(result)

        const first16Characters = result.slice(0, 16);
        setCharacters(
          first16Characters.map((character) => ({
            img: character.image,
            id: character.id,
            name: character.name,
          }))
        );
        randomizeCharacters();
      } catch (error) {
        console.error("Error fetching character data:", error.message);
      }
    }

    getCharacterData();
  }, []);


  return (
    <div className="app">
      <Header currentScore={currentScore} highScore={highScore} />
      <div className="flex">
        {characters.length !== 0 && (
          <>
            {characters.slice(0, 8).map((character, index) => (
              <Character
                key={index}
                playGame={gamePlay}
                shuffleCharacters={randomizeCharacters}
                url={character.img}
                name={character.name}
                id={character.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
