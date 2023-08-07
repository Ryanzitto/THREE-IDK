import { useEffect } from "react";
import { useStoreApp } from "../store";

export const Menu = () => {
  const { gameStage, setGameStage } = useStoreApp();
  let audio = new Audio("audio/option.mp3");
  const playAudio = () => {
    audio.play();
  };

  return (
    <div className="menu-overlay">
      <div className="menu-content flex flex-col gap-10">
        <h1 className="text-white font-bold text-5xl mb-10">IDK GAME</h1>
        <button
          onClick={() => {
            setGameStage("GAME");
          }}
          className="text-white border border-white text-5xl font-bold px-10 py-4 hover:opacity-60 transition-all"
        >
          START GAME
        </button>
        <button
          onClick={playAudio}
          className="text-white border border-white text-5xl font-bold px-10 py-4 hover:opacity-60 transition-all"
        >
          OPTIONS
        </button>
      </div>
    </div>
  );
};
